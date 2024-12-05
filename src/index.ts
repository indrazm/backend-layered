import { Elysia } from "elysia";
import { authRouter } from "./presentation/router/authRouter";

const app = new Elysia().use(authRouter).listen(8000);
