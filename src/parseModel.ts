export function parsePrizes(input: string): { name: string; count: number }[] {
  return input
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [name, countStr] = line.split(",");
      if (!countStr) throw new Error(`格式錯誤：${line}`);
      const count = parseInt(countStr.trim());
      if (!name || isNaN(count) || count < 1) throw new Error(`格式錯誤：${line}`);
      return { name: name.trim(), count };
    });
}
