import { CalculateStockController } from "@/controller/stock/calculate-stock";
import { StockEntryController } from "@/controller/stock/entry-stock";
import { GetStockProductController } from "@/controller/stock/get-stockProduct";
import { StockOutPutController } from "@/controller/stock/output-stock";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router();

const authMidlleware = new AuthMidlleware()

routes.use(authMidlleware.validateToken)

routes.get("/", async (req,res) => {
  const stockProductController = new GetStockProductController()

  const {body,statusCode} = await stockProductController.handle({
    params: req.query
  })

  res.status(statusCode).send(body);
})
routes.post("/", async (req, res) => {
  const stockController = new CalculateStockController();

  const { body, statusCode } = await stockController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
routes.post("/entry", async (req, res) => {
  const stockEntry = new StockEntryController();

  const { body, statusCode } = await stockEntry.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
routes.post("/output", async (req, res) => {
  const stockOutput = new StockOutPutController();

  const { body, statusCode } = await stockOutput.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { routes as StockRoutes };
