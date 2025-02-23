import { LoginController } from "@/controller/login/login";
import { ValidateLoginController } from "@/controller/login/validate-login";
import { Router } from "express";

const routes = Router();

routes.post("/", async (req, res) => {
    const loginController = new LoginController()

    const userAgent = req.headers["user-agent"];

    const mobileRegex = /mobile|android|iphone|ipad|phone/i;

    if (userAgent && mobileRegex.test(userAgent)) {
        return res.status(403).send({ message: "Infelizmente no momento não é possivel acessar nosso sistema pelo celular." });
    }

    const { body, statusCode } = await loginController.handle({
        body: req.body
    })

    if (statusCode === 200) {
        res.cookie('token', body.token, {
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true,
            secure: false
        })
    }
    if (statusCode === 403) {
        res.status(statusCode).send(body)
    } else {
        res.status(statusCode).send(body.user)
    }
})

routes.get("/validate", async (req, res) => {
    const validateLoginController = new ValidateLoginController()

    const { body, statusCode } = await validateLoginController.handle({
        cookies: req.cookies
    })

    res.status(statusCode).send(body)
})


export { routes as LoginRoutes }