import { CalculateStockController } from "@/controller/stock/calculate-stock";
import { Router } from "express";

const routes = Router()

routes.post("/", async (req,res) => {
    const stockController = new CalculateStockController()

    const {body,statusCode} = await stockController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})
export { routes as StockRoutes };