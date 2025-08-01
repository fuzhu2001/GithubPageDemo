"use client";

import { useState } from "react";
import CandidateInput from "@/app/ui/CandidateInput";
import PrizeInput, { Prize } from "@/app/ui/PrizeInput";
import DrawButton, { DrawResult } from "@/app/ui/DrawButton";


export default function Home() {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([{ name: "", count: 1 }]);
  const [results, setResults] = useState<DrawResult[]>([]);

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-2">簡易抽獎機</h1>
    
      <CandidateInput onChange={setCandidates} />

      <PrizeInput prizes={prizes} onChange={setPrizes} />

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">得獎名單</h2>
          <ul className="list-disc list-inside">
            {results.map((r, index) => (
              <li key={index}>
                {r.name} 抽中了「{r.prize}」
              </li>
            ))}
          </ul>
        </div>
      )}

      <DrawButton
        candidates={candidates}
        prizes={prizes}
        onDraw={setResults}
      />
    </div>
  );
}
