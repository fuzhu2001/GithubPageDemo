// src/randomModel.ts
var secureGetRandomValues = crypto.getRandomValues.bind(crypto);
function getRandomValue(min, max) {
  const range = max - min + 1;
  const randArray = new Uint32Array(1);
  const size = 4294967296;
  const maximum = 4294967295;
  const clipMaximum = maximum - size % range;
  let randomValue;
  do {
    secureGetRandomValues(randArray);
    randomValue = randArray[0];
  } while (randomValue > clipMaximum);
  randomValue = min + randomValue % range;
  return randomValue;
}
function fisherYatesShuffle(min, max) {
  const range = max - min + 1;
  const numbers = Array.from({ length: range }, (_, i) => i + min);
  for (let i = numbers.length - 1;i > 0; --i) {
    let j = getRandomValue(min, i);
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

// src/parseModel.ts
function parsePrizes(input) {
  return input.split(`
`).map((line) => line.trim()).filter(Boolean).map((line) => {
    const [name, countStr] = line.split(",");
    if (!countStr)
      throw new Error(`格式錯誤：${line}`);
    const count = parseInt(countStr.trim());
    if (!name || isNaN(count) || count < 1)
      throw new Error(`格式錯誤：${line}`);
    return { name: name.trim(), count };
  });
}

// src/lotteryViewModel.ts
class LotteryViewModel {
  namesInput;
  prizesInput;
  resultDisplay;
  participants = [];
  prizes = [];
  allowDuplicates = false;
  constructor(namesInput, prizesInput, resultDisplay) {
    this.namesInput = namesInput;
    this.prizesInput = prizesInput;
    this.resultDisplay = resultDisplay;
  }
  draw() {
    try {
      this.participants = this.namesInput.value.split(`
`).map((n) => n.trim()).filter(Boolean);
      this.prizes = parsePrizes(this.prizesInput.value);
      const totalWinnersNeeded = this.prizes.reduce((sum, p) => sum + p.count, 0);
      this.allowDuplicates = this.participants.length < totalWinnersNeeded;
      if (this.participants.length === 0) {
        this.resultDisplay.textContent = "候選名單人數須 > 0";
        return;
      }
      const assignments = [];
      if (this.allowDuplicates) {
        for (const prize of this.prizes) {
          for (let i = 0;i < prize.count; i++) {
            const winner = this.participants[getRandomValue(0, this.participants.length - 1)];
            assignments.push({ prize: prize.name, winner });
          }
        }
      } else {
        const shuffledIndexes = fisherYatesShuffle(0, this.participants.length - 1);
        const shuffled = shuffledIndexes.map((i) => this.participants[i]);
        let index = 0;
        for (const prize of this.prizes) {
          for (let i = 0;i < prize.count; i++) {
            assignments.push({ prize: prize.name, winner: shuffled[index++] });
          }
        }
      }
      const resultText = assignments.map((a) => `${a.prize}, ${a.winner}`).join(`
`);
      this.resultDisplay.textContent = resultText;
    } catch (err) {
      this.resultDisplay.textContent = `錯誤：${err.message}`;
    }
  }
}
export {
  LotteryViewModel
};
