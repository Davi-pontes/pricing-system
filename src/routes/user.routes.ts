import { CreateUserController } from "@/controller/user/create-user";
import { GetUserController } from "@/controller/user/get-user";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { Router } from "express";

const routes = Router();

routes.get("/", async(req,res) => {
    const getUserController = new GetUserController()

    const {body,statusCode} = await getUserController.handle()

    res.status(statusCode).send(body)
})

routes.post("/", async (req, res) => {
    const createUserController = new CreateUserController()

    const { body, statusCode } = await createUserController.handle({
        body: req.body
    })
    res.status(statusCode).send(body)
})


export { routes as UserRoutes }