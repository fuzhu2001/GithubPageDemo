import { LotteryViewModel } from './lotteryViewModel';

document.addEventListener("DOMContentLoaded", () => {
  const namesInput = document.getElementById("names") as HTMLTextAreaElement;
  const prizesInput = document.getElementById("prizes") as HTMLTextAreaElement;
  const resultDisplay = document.getElementById("result")!;
  const drawBtn = document.getElementById("draw-btn")!;

  const viewModel = new LotteryViewModel(namesInput, prizesInput, resultDisplay);
  drawBtn.addEventListener("click", () => viewModel.draw());
});
