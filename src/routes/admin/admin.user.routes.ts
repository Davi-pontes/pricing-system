import { GetUserController } from "@/controller/user/get-user";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router();

const authMidlleware = new AuthMidlleware();

routes.use(authMidlleware.validateToken);
routes.use(authMidlleware.validateUserIsAdmin)

routes.get("/", async (req, res) => {
  const getUserController = new GetUserController();

  const { body, statusCode } = await getUserController.handle();

  res.status(statusCode).send(body);
});

export { routes as AdminUserRoutes };