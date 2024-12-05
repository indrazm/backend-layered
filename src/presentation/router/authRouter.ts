import Elysia, { t } from "elysia";
import { authServices } from "../../application/instance";

export const authRouter = new Elysia({ prefix: "/api" })
	// routes
	.post(
		"/register",
		async ({ body, set }) => {
			try {
				const newUser = await authServices.registerUser(
					body.name,
					body.email,
					body.password,
				);

				set.status = 201;
				return newUser;
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong!");
			}
		},
		{
			body: t.Object({
				name: t.String({ minLength: 3 }),
				email: t.String({ format: "email" }),
				password: t.String({ minLength: 8 }),
			}),
		},
	)
	.post(
		"/login",
		async ({ body, set }) => {
			try {
				const session = await authServices.loginUser(body.email, body.password);
				return { sessionId: session.id };
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong!");
			}
		},
		{
			body: t.Object({
				email: t.String({ format: "email" }),
				password: t.String({ minLength: 8 }),
			}),
		},
	);