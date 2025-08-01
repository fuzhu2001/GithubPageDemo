import React from "react";

type Props = {
  onChange: (names: string[]) => void;
};

export default function CandidateInput({ onChange }: Props) {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    onChange(lines);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        候選名單（每行一位）：
      </h2>
      <textarea
        id="candidates"
        rows={8}
        onChange={handleInput}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
