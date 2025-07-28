const secureGetRandomValues = crypto.getRandomValues.bind(crypto)

function getRandomValue(min: number, max: number) {
  const range = max - min + 1;
  const randArray = new Uint32Array(1);
  const size = 0x100000000;
  const maximum = 0xffffffff;
  const clipMaximum = maximum - (size % range);

  let randomValue: number;
  do {
    secureGetRandomValues(randArray);
    randomValue = randArray[0];
  } while (randomValue > clipMaximum);
  randomValue = min + (randomValue % range);
  return randomValue;
}

function fisherYatesShuffle(min: number, max: number, count: number) {
  const range = max - min + 1;
  if (range < count) {
    throw new Error("range < count");
  }

  const numbers = Array.from({ length: range }, (_, i) => i + min);
  for (let i = numbers.length - 1; i > 0; --i) {
    let j = getRandomValue(min, i);
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers.slice(0, count);
}

function generateRandom(): void {  
  const display = document.getElementById("result");
  if (display) {
    display.textContent = `亂數是：${fisherYatesShuffle(0, 100, 10)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generate-btn");
  if (button) {
    button.addEventListener("click", generateRandom);
  }
});