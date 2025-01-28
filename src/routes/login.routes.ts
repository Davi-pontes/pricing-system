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

    res.cookie('token', body.token, {
        maxAge: 1000 * 60 * 60 * 8,
        httpOnly: true,
        secure: false
    })
    res.status(statusCode).send(body.user)
})

routes.get("/validate", async (req, res) => {
    const validateLoginController = new ValidateLoginController()

    const { body, statusCode } = await validateLoginController.handle({
        cookies: req.cookies
    })

    res.status(statusCode).send(body)
})


export { routes as LoginRoutes }