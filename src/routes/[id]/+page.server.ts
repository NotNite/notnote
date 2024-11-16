import { getNote } from "$lib/server/note";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { id }, url }) => {
  if (id == null) return error(400);
  id = id.toLowerCase().trim();

  const note = await getNote(id);
  if (note == null) return error(404);

  return {
    id,
    note
  };
};
