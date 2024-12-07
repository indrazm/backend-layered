import { Elysia } from "elysia";
import { authRouter } from "./presentation/router/authRouter";
import { noteRouter } from "./presentation/router/noteRouter";

const app = new Elysia({ prefix: "/api" })
	.use(authRouter)
	.use(noteRouter)
	.listen(8000);
