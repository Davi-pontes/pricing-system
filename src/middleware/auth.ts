import { AuthController } from "@/controller/auth/auth";
import { ok, serverError, unauthorized } from "@/helper/helper";
import { NextFunction, Request, Response } from "express";

export class AuthMidlleware {
    async validateToken(req: Request, res: Response, next: NextFunction): Promise<any> {
        const authController = new AuthController()

        const { body, statusCode } = await authController.handle(req)

        if (statusCode === 200) {
            next()
        } else {
            res.status(statusCode).send(body)
        }
    }

}