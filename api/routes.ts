import { Request, Response, Router } from "express";
import User from "./database/controller/User";

const routes = Router();

routes.get("/users", User.getUsers);
routes.post("/login", User.signIn);

export default routes;