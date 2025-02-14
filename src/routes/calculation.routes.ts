import { CalculationDataProductWithouIngredientController } from "@/controller/calculation/calculation";
import { CalculationDataProductWitIngredientController } from "@/controller/calculation/calculationProductWithIngredient";
import { AuthMidlleware } from "@/middleware/auth";
import { Router } from "express";

const routes = Router()

const authMidlleware = new AuthMidlleware();

routes.use(authMidlleware.validateToken);

routes.post('/', async(req,res) => {
    const calculationController = new CalculationDataProductWithouIngredientController()

    const {body,statusCode} = await calculationController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})
routes.post('/product-ingredient', async(req,res) => {
    const calculationController = new CalculationDataProductWitIngredientController()

    const {body,statusCode} = await calculationController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})

export { routes as CalculateRoutes };