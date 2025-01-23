import { GetPaymentMethodController } from "@/controller/paymentMethod/get-paymentMethod";
import { Router } from "express";
const routes = Router();

routes.get("/", async(req,res) => {
    const paymentMethodController = new GetPaymentMethodController()

    const {body,statusCode} = await paymentMethodController.handle({
        params: req.query
    })
    res.status(statusCode).send(body);
})

export { routes as PaymentMethodRoutes };