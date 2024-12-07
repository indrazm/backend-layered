import Elysia, { t } from "elysia";
import { authServices, noteServices } from "../../application/instance";
import { AuthorizationError } from "../../infrastructure/entity/errors";

export const noteRouter = new Elysia({ prefix: "/v1/notes" })
	.derive(async ({ headers }) => {
		const sessionId = headers.authorization?.split(" ")[1];

		if (!sessionId) {
			throw new AuthorizationError("Session id not provided!");
		}

		const { user } = await authServices.decodeSession(sessionId);

		return { user };
	})
	// routes
	.get("/", async ({ user }) => {
		const notes = await noteServices.getAll(user.id);
		return notes;
	})
	.get("/:id", async ({ params }) => {
		const note = await noteServices.getOne(params.id);
		return note;
	})
	.post(
		"/",
		async ({ body, user, set }) => {
			const { title, content } = body;

			const newNote = await noteServices.create({
				title,
				content,
				authorId: user.id,
			});

			set.status = 201;
			return newNote;
		},
		{
			body: t.Object({
				title: t.String(),
				content: t.String(),
			}),
		},
	)
	.patch(
		"/:id",
		async ({ params, body }) => {
			const { title, content } = body;

			const updatedNote = await noteServices.update(params.id, {
				title,
				content,
			});
			return updatedNote;
		},
		{
			body: t.Object({
				title: t.Optional(t.String()),
				content: t.Optional(t.String()),
			}),
		},
	)
	.delete("/:id", async ({ params, set }) => {
		set.status = 204;
		await noteServices.delete(params.id);
	});
