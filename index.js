function generateRandom() {
  const result = Math.floor(Math.random() * 100);
  const display = document.getElementById("result");
  if (display) {
    display.textContent = `亂數是：${result}`;
  }
}
