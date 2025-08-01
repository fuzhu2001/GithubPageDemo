"use client";

import { useState } from "react";
import CandidateInput from "@/app/ui/CandidateInput";
import PrizeInput, { Prize } from "@/app/ui/PrizeInput";
import DrawButton, { DrawMode, DrawResult } from "@/app/ui/DrawButton";


export default function Home() {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([{ name: "", count: 1 }]);
  const [results, setResults] = useState<DrawResult[]>([]);
  const [drawMode, setDrawMode] = useState<DrawMode>("no-repeat");

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-2">簡易抽獎機</h1>
    
      <CandidateInput onChange={setCandidates} />

      <PrizeInput prizes={prizes} onChange={setPrizes} />

      <div className="mb-2">
        <label className="mr-4 font-medium">抽獎規則：</label>
        <select
          className="border rounded px-2 py-1"
          value={drawMode}
          onChange={(e) => setDrawMode(e.target.value as DrawMode)}
        >
          <option value="no-repeat">每人僅得獎一次</option>
          <option value="allow-repeat">允許重複得獎</option>
        </select>
        </div>

      <DrawButton
        candidates={candidates}
        prizes={prizes}
        drawMode={drawMode}
        onDraw={setResults}
      />
    </div>
  );
}
