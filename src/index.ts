import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "hello!").listen(8000);
