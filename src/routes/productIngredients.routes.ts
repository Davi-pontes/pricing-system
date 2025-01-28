import { GetProductIngredientByIdController } from "@/controller/productIngredien/get-productIngredient";
import { MySqlGetProductIngredientRepository } from "@/repository/productIngredient/get-ingredient";
import { GetAllProductIngredientController } from "@/controller/productIngredien/get-all-productIngredient"
import { MySqlGetAllProductIngredientRepository } from "@/repository/productIngredient/get-all-ingredient"
import { Router } from "express";
import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";
import { UpdateSpecificProductIngredientController } from "@/controller/productIngredien/update-specificProductIngredient";
import { MySqlUpdateStockRepository } from "@/repository/productIngredient/update-stock";
import { UpdateStockController } from "@/controller/productIngredien/update-stock";
import { AuthMidlleware } from "@/middleware/auth";

const routes = Router();

const authMidlleware = new AuthMidlleware()

routes.use(authMidlleware.validateToken)

routes.get("/", async (req, res) => {
    const mySqlGetProductIngredientRepository = new MySqlGetProductIngredientRepository()

    const getProductIngredientController = new GetProductIngredientByIdController(mySqlGetProductIngredientRepository)

    const { body, statusCode } = await getProductIngredientController.handle({
        params: req.query
    })

    res.status(statusCode).send(body)
})
routes.get("/all", async (req, res) => {
    const mySqlGetAllProductIngredientRepository = new MySqlGetAllProductIngredientRepository()

    const getProductIngredientController = new GetAllProductIngredientController(mySqlGetAllProductIngredientRepository)

    const { body, statusCode } = await getProductIngredientController.handle({
        params: req.query
    })

    res.status(statusCode).send(body)
})

routes.patch("/specific", async(req,res) => {
    const mySqlGetSpecificProductIngredientRepository = new MySqlUpdateSpecificProductIngredientRepository()

    const getSpecificProductIngredientController = new UpdateSpecificProductIngredientController(mySqlGetSpecificProductIngredientRepository)

    const {body,statusCode} = await getSpecificProductIngredientController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})

routes.patch("/stock", async(req,res) => {
    const mySqlUpdateStockRepository = new MySqlUpdateStockRepository()

    const updateStockController = new UpdateStockController(mySqlUpdateStockRepository)

    const {body, statusCode} = await updateStockController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})

export { routes as ProductIngredientRoutes };