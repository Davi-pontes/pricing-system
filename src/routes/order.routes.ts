import { GetOrderController } from "@/controller/order/get-order";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
  const orderController = new GetOrderController();

  const { body, statusCode } = await orderController.handle({
    params: req.query,
  });

  res.status(statusCode).send(body);
});

export { routes as OrderRoutes };