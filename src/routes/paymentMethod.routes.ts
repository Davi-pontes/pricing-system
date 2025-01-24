import { GetPaymentMethodController } from "@/controller/paymentMethod/get-paymentMethod";
import { UpdatePaymentMethodController } from "@/controller/paymentMethod/update-paymentMethod";
import { Router } from "express";
const routes = Router();

routes.get("/", async(req,res) => {
    const paymentMethodController = new GetPaymentMethodController()

    const {body,statusCode} = await paymentMethodController.handle({
        params: req.query
    })
    res.status(statusCode).send(body);
})
routes.put("/", async(req,res) => {
    const paymentMethodController = new UpdatePaymentMethodController()

    const {body,statusCode} = await paymentMethodController.handle({
        params: req.query,
        body: req.body
    })
    res.status(statusCode).send(body);
})

export { routes as PaymentMethodRoutes };