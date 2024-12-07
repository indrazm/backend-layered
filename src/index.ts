import { Elysia } from "elysia";
import { authRouter } from "./presentation/router/authRouter";
import { noteRouter } from "./presentation/router/noteRouter";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const app = new Elysia()
	.use(cors())
	.use(
		swagger({
			path: "/docs",
		}),
	)
	.group("/api", (app) => app.use(authRouter).use(noteRouter))
	.listen(8000);
