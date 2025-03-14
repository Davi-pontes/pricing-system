import { GetUserController } from "@/controller/user/get-user";
import { UpdateUserController } from "@/controller/user/update-user";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router();

const authMidlleware = new AuthMidlleware();

routes.use(authMidlleware.validateToken);

routes.get("/:id", async (req, res) => {
  const getUserController = new GetUserController();

  const { body, statusCode } = await getUserController.getUserById(
    req.params.id
  );

  res.status(statusCode).send(body);
});

routes.put("/", async (req, res) => {
  const updateUserController = new UpdateUserController();

  const { body, statusCode } = await updateUserController.handle({
    params: req.query,
    body: req.body,
  });
  res.status(statusCode).send(body);
});

routes.patch("/disable", async (req, res) => {
  const updateUserController = new UpdateUserController();

  const { body, statusCode } = await updateUserController.deactivateUser({
    body: req.body,
  });
  
  res.status(statusCode).send(body);
});
routes.patch("/activate", async (req, res) => {
  const updateUserController = new UpdateUserController();

  const { body, statusCode } = await updateUserController.activateUser({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { routes as UserRoutes };
