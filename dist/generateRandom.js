// src/generateRandom.ts
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
function drawLottery() {
  const namesEl = document.getElementById("names");
  const prizesEl = document.getElementById("prizes");
  const resultEl = document.getElementById("result");
  try {
    const participants = namesEl.value.split(`
`).map((name) => name.trim()).filter(Boolean);
    const prizes = parsePrizes(prizesEl.value);
    let allowDuplicates = false;
    const totalWinnersNeeded = prizes.reduce((sum, p) => sum + p.count, 0);
    if (participants.length < totalWinnersNeeded) {
      allowDuplicates = true;
    }
    if (participants.length == 0) {
      resultEl.textContent = "候選名單人數須 > 0";
      return;
    }
    const assignments = [];
    if (allowDuplicates) {
      for (const prize of prizes) {
        for (let i = 0;i < prize.count; i++) {
          assignments.push({ prize: prize.name, winner: participants[getRandomValue(0, participants.length - 1)] });
        }
      }
    } else {
      const shuffledIndex = fisherYatesShuffle(0, participants.length - 1);
      const shuffled = shuffledIndex.map((i) => participants[i]);
      let index = 0;
      for (const prize of prizes) {
        for (let i = 0;i < prize.count; i++) {
          assignments.push({ prize: prize.name, winner: shuffled[index] });
          ++index;
        }
      }
    }
    const resultText = assignments.map((a) => `${a.prize}, ${a.winner}`).join(`
`) + `
`;
    resultEl.textContent = resultText;
  } catch (err) {
    resultEl.textContent = `錯誤：${err.message}`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("draw-btn");
  if (button) {
    button.addEventListener("click", drawLottery);
  }
});
