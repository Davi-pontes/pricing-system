import { LoginController } from "@/controller/login/login";
import { ValidateLoginController } from "@/controller/login/validate-login";
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

routes.get("/validate", async (req, res) => {
    const validateLoginController = new ValidateLoginController()

    const { body, statusCode } = await validateLoginController.handle({
        headers: req.headers
    })

    res.status(statusCode).send(body)
})


export { routes as LoginRoutes }