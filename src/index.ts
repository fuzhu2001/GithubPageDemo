function generateRandom(): void {
  const result = Math.floor(Math.random() * 100);
  const display = document.getElementById("result");
  if (display) {
    display.textContent = `亂數是：${result}`;
  }
}
