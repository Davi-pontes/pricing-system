import { LoginController } from "@/controller/login/login";
import { MySqlLoginRepository } from "@/repository/login/login";
import { Router } from "express";

const routes = Router();

routes.post("/", async (req, res) => {
    const mysqlLoginRepository = new MySqlLoginRepository()

    const loginController = new LoginController(mysqlLoginRepository)

    const { body, statusCode } = await loginController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})


export { routes as LoginRoutes }