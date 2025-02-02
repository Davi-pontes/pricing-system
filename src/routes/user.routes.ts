import { GetUserController } from "@/controller/user/get-user";
import { UpdateUserController } from "@/controller/user/update-user";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router();

const authMidlleware = new AuthMidlleware()

routes.use(authMidlleware.validateToken)

routes.get("/", async (req, res) => {
    const getUserController = new GetUserController()

    const { body, statusCode } = await getUserController.handle()

    res.status(statusCode).send(body)
})
routes.get("/:id", async (req, res) => {
    const getUserController = new GetUserController()

    const { body, statusCode } = await getUserController.getUserById(req.params.id)

    res.status(statusCode).send(body)
})

routes.put("/", async (req, res) => {
    const updateUserController = new UpdateUserController()

    const { body, statusCode } = await updateUserController.handle({
        params: req.query,
        body: req.body
    })
    res.status(statusCode).send(body)
})


export { routes as UserRoutes }