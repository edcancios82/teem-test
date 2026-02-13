import type { UserEntity } from "../entities/Users";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    const data: UserEntity[] = await res.json();
    return data;
}