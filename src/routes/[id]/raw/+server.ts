import { getNote } from "$lib/server/note";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params: { id } }) => {
  if (id == null) return error(400);
  id = id.toLowerCase().trim();

  const note = await getNote(id);
  if (note == null) return error(404);

  return new Response(note);
};
