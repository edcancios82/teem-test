import type { SectionEntity } from "../entities";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getSections() {
  const res = await fetch(`${BASE_URL}/sections`);
  const data: SectionEntity[] = await res.json();
  return data;
}

export async function updateSection(sectionId: string, formData: any) {
  const res = await fetch(`${BASE_URL}/sections/${sectionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data: SectionEntity = await res.json();
  return data;
}

export async function updateSectionOwners(sectionId: string, userId: string) {
  const res = await fetch(`${BASE_URL}/sections/${sectionId}/update-owners`, {
    method: "PUT",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data: SectionEntity = await res.json();
  return data;
}

export async function clearSectionOwners() {
  const res = await fetch(`${BASE_URL}/sections/clear`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data: SectionEntity[] = await res.json();
  return data;
}
