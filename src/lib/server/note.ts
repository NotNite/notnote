import { isValid, ulid } from "ulidx";
import { env } from "$env/dynamic/private";
import redis from "./redis";

const maxFileSize = parseInt(env.MAX_FILE_SIZE);

export async function getNote(id: string) {
  id = id.toLowerCase().trim();
  if (!isValid(id)) return null;
  if (!(await redis.exists(id))) return null;
  return await redis.get(id);
}

export async function createNote(note: string) {
  const bytes = new TextEncoder().encode(note).length;
  if (bytes > maxFileSize) return null;

  const id = ulid().toLowerCase();
  if (await redis.exists(id)) return null;
  if (await redis.set(id, note)) return id;

  return null;
}
