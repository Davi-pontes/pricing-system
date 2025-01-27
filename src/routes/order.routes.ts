import { CreateOrderController } from "@/controller/order/create-order";
import { GetOrderController } from "@/controller/order/get-order";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router();

const authMidlleware = new AuthMidlleware()

routes.use(authMidlleware.validateToken)

routes.get("/", async (req, res) => {
  const orderController = new GetOrderController();

  const { body, statusCode } = await orderController.handle({
    params: req.query,
  });

  res.status(statusCode).send(body);
});
routes.get("/day", async (req, res) => {
  const orderController = new GetOrderController();

  const { body, statusCode } = await orderController.handleQueryIdUserAndDay({
    params: req.query,
  });

  res.status(statusCode).send(body);
});

routes.post("/", async (req,res) => {
  const createOrderController = new CreateOrderController()

  const {body,statusCode} = await createOrderController.handle({
    body: req.body
  })
  res.status(statusCode).send(body);
})

export { routes as OrderRoutes };