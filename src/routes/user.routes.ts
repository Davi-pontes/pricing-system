import { CreateUserController } from "@/controller/user/create-user";
import { MySqlCreateUserRepository } from "@/repository/user/create-user";
import { Router } from "express";

const routes = Router();

routes.post("/", async(req,res) => {
    const mySqlCreateUserRepository = new MySqlCreateUserRepository()

    const createUserController = new CreateUserController(mySqlCreateUserRepository)

    const {body,statusCode} = await createUserController.handle({
        body: req.body
    })
    res.status(statusCode).send(body)
})




export {routes as UserRoutes}