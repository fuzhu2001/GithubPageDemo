import { useState } from "react";
import { DrawResult } from "@/app/ui/DrawButton";

type Props = {
  results: DrawResult[];
};

export default function DrawResultViewer({ results }: Props) {
  const [isCsvMode, setIsCsvMode] = useState(false);

  const csvText = [
    "得獎者,獎品",
    ...results.map((r) => `${r.name},${r.prize}`),
  ].join("\n");

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">得獎名單</h2>
        <button
          onClick={() => setIsCsvMode(!isCsvMode)}
          className="text-blue-600 hover:underline"
        >
          {isCsvMode ? "切換到表格模式" : "切換到 CSV 模式"}
        </button>
      </div>

      {isCsvMode ? (
        <textarea
          readOnly
          className="w-full border p-2 rounded font-mono"
          rows={results.length + 2}
          value={csvText}
        />
      ) : results.length === 0 ? (
        <p className="text-gray-500">尚無得獎紀錄。</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">編號</th>
                <th className="px-4 py-2 border-b">得獎者</th>
                <th className="px-4 py-2 border-b">獎品</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{i + 1}</td>
                  <td className="px-4 py-2 border-b">{r.name}</td>
                  <td className="px-4 py-2 border-b">{r.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
