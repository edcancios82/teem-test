import type { SectionEntity } from "../entities";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getSections() {
  const res = await fetch(`${BASE_URL}/sections`);
  const data: SectionEntity[] = await res.json();
  return data;
}

export async function updateSection(id: string, formData: any) {
  const res = await fetch(`${BASE_URL}/sections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data: SectionEntity = await res.json();
  return data;
}
