import { CreateUserController } from "@/controller/user/create-user";
import { Router } from "express";

const routes = Router();

routes.post("/", async (req, res) => {
    const createUserController = new CreateUserController()

    const { body, statusCode } = await createUserController.handle({
        body: req.body
    })
    res.status(statusCode).send(body)
})

export { routes as PublicUserRoutes }