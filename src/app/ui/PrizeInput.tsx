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
      <h2 className="text-xl font-bold mb-2">獎品清單</h2>
          {prizes.map((prize, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="獎品名稱"
                value={prizes[index].name}
            onChange={(e) => handlePrizeChange(index, "name", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                min={1}
                value={prizes[index].count}
            onChange={(e) => handlePrizeChange(index, "count", e.target.value)}
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
      <button onClick={addPrize} className="mt-2 text-blue-600 hover:underline">
        ➕ 新增獎品
          </button>
    </div>
  );
}
