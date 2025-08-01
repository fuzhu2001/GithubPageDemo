import { Prize } from "@/app/ui/PrizeInput";
import { getRandomValue, fisherYatesShuffle } from "@/app/lib/randomModel"

export type DrawMode = "no-repeat" | "allow-repeat";

export type DrawResult = {
  name: string;
  prize: string;
};

type Props = {
  candidates: string[];
  prizes: Prize[];
  drawMode: DrawMode;
  onDraw: (results: DrawResult[]) => void;
};


export default function DrawButton({ candidates, prizes, drawMode, onDraw }: Props) {
  const handleDraw = () => {
    // 檢查輸入
    const totalPrizes = prizes.reduce((sum, p) => sum + p.count, 0);
    if (candidates.length < totalPrizes) {
      alert(`候選人不足（需要至少 ${totalPrizes} 人）`);
      return;
    }

    // 複製名單與獎品，避免修改原始資料
    const availableCandidates = [...candidates];
    const prizePool: string[] = [];
    prizes.forEach((prize) => {
      for (let i = 0; i < prize.count; i++) {
        prizePool.push(prize.name);
      }
    });

    // 抽出結果
    let results: DrawResult[] = [];
    if (drawMode === "no-repeat") {
      // 隨機打亂候選人與獎品
      fisherYatesShuffle(availableCandidates);
      results = prizePool.map((prizeName, i) => ({
        name: availableCandidates[i],
        prize: prizeName,
      }));
    } else {
      results = prizePool.map((prizeName) => {
        const winner = availableCandidates[getRandomValue(0, availableCandidates.length-1)];
        return {
          name: winner,
          prize: prizeName,
        };
      });
    }
    onDraw(results);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleDraw}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        抽獎
      </button>
    </div>
  );
}
