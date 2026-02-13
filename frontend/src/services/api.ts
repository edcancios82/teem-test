import type { SectionEntity } from "../entities";

export async function getSections() {
  const res = await fetch("http://localhost:3001/sections");
  const data: SectionEntity[] = await res.json();
  return data;
}
