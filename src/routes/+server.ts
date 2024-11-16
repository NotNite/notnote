import { createNote } from "$lib/server/note";
import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.text();
  const id = await createNote(body);
  if (id == null) return error(400);

  return new Response(id, {
    status: 201
  });
};
