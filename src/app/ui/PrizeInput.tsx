import { useState } from "react";

export type Prize = {
  name: string;
  count: number;
};

type Props = {
  prizes: Prize[];
  onChange: (prizes: Prize[]) => void;
};

export default function PrizeInput({ prizes, onChange }: Props) {
  const [isCsvMode, setIsCsvMode] = useState(false);
  const [csvText, setCsvText] = useState("");

  const handleIsCsvModeChange = () => {
    if (!isCsvMode) {
      const lines = prizes.map((p) => `${p.name},${p.count}`);
      setCsvText(lines.join("\n"));
    }
    setIsCsvMode(!isCsvMode);
  }

  // 處理 CSV 文字變更，轉成獎品陣列並回傳
  const handleCsvChange = (text: string) => {
    setCsvText(text);
    const lines = text.split("\n");
    const newPrizes: Prize[] = [];
    for (const line of lines) {
      const [name, countStr] = line.split(",");
      if (!name) continue;
      const count = parseInt(countStr || "1");
      if (!isNaN(count) && count > 0) {
        newPrizes.push({ name: name.trim(), count });
      }
    }
    onChange(newPrizes);
  };

  // 表單模式的變更函式
  const handlePrizeChange = (
    index: number,
    field: keyof Prize,
    value: string
  ) => {
    const newPrizes = [...prizes];
    if (field === "count") {
      newPrizes[index][field] = Math.max(1, parseInt(value) || 1);
    } else {
      newPrizes[index][field] = value;
    }
    onChange(newPrizes);
  };

  const addPrize = () => {
    onChange([...prizes, { name: "", count: 1 }]);
  };

  const removePrize = (index: number) => {
    const newPrizes = [...prizes];
    newPrizes.splice(index, 1);
    onChange(newPrizes);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">獎品清單</h2>
        <button
          onClick={handleIsCsvModeChange}
          className="text-blue-600 hover:underline"
        >
          {isCsvMode ? "切換到表單模式" : "切換到 CSV 模式"}
        </button>
      </div>

      {isCsvMode ? (
        <textarea
          rows={8}
          className="w-full border p-2 rounded font-mono"
          value={csvText}
          onChange={(e) => handleCsvChange(e.target.value)}
          placeholder="格式：獎品名稱,數量 例如：iPad,1"
        />
      ) : (
        <>
          {prizes.map((prize, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="獎品名稱"
                value={prizes[index].name}
                onChange={(e) =>
                  handlePrizeChange(index, "name", e.target.value)
                }
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                min={1}
                value={prizes[index].count}
                onChange={(e) =>
                  handlePrizeChange(index, "count", e.target.value)
                }
                className="border p-2 rounded w-20"
              />
              <button
                onClick={() => removePrize(index)}
                className="text-red-500 hover:underline"
                disabled={prizes.length <= 1}
              >
                移除
              </button>
            </div>
          ))}
          <button
            onClick={addPrize}
            className="mt-2 text-blue-600 hover:underline"
          >
            新增獎品
          </button>
        </>
      )}
    </div>
  );
}
