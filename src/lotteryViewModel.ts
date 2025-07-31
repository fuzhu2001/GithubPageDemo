import { getRandomValue, fisherYatesShuffle } from './randomModel';
import { parsePrizes } from './parseModel';

export class LotteryViewModel {
  private participants: string[] = [];
  private prizes: { name: string; count: number }[] = [];
  private allowDuplicates = false;

  constructor(
    private namesInput: HTMLTextAreaElement,
    private prizesInput: HTMLTextAreaElement,
    private resultDisplay: HTMLElement
  ) {}

  public draw(): void {
    try {
      this.participants = this.namesInput.value
        .split("\n")
        .map(n => n.trim())
        .filter(Boolean);

      this.prizes = parsePrizes(this.prizesInput.value);

      const totalWinnersNeeded = this.prizes.reduce((sum, p) => sum + p.count, 0);
      this.allowDuplicates = this.participants.length < totalWinnersNeeded;

      if (this.participants.length === 0) {
        this.resultDisplay.textContent = "候選名單人數須 > 0";
        return;
      }

      const assignments: { prize: string; winner: string }[] = [];

      if (this.allowDuplicates) {
        for (const prize of this.prizes) {
          for (let i = 0; i < prize.count; i++) {
            const winner = this.participants[getRandomValue(0, this.participants.length - 1)];
            assignments.push({ prize: prize.name, winner: winner ?? "undefined" });
          }
        }
      } else {
        const shuffledIndexes = fisherYatesShuffle(0, this.participants.length - 1);
        const shuffled = shuffledIndexes.map(i => this.participants[i]);

        let index = 0;
        for (const prize of this.prizes) {
          for (let i = 0; i < prize.count; i++) {
            assignments.push({ prize: prize.name, winner: shuffled[index++] ?? "undefined" });
          }
        }
      }

      const resultText = assignments.map(a => `${a.prize}, ${a.winner}`).join("\n");
      this.resultDisplay.textContent = resultText;
    } catch (err) {
      this.resultDisplay.textContent = `錯誤：${(err as Error).message}`;
    }
  }
}