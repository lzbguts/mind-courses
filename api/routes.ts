import { Request, Response, Router } from "express";
import Course from "./database/controller/Course";
import User from "./database/controller/User";

const routes = Router();

routes.get("/users", User.getUsers);
routes.post("/signIn", User.signIn);
routes.post("/signUp", User.signUp);
routes.post("/verify", User.verify);

routes.post("/courses", Course.getCursos);
routes.post("/courses/all", Course.getAllCursos);
routes.post("/courses/c/:id", Course.getOneCurso);
routes.post("/courses/new", Course.createCurso);
routes.post("/courses/edit", Course.updateCurso);
routes.post("/courses/delete", Course.deleteCurso);

export default routes;