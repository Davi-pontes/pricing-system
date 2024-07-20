import { GetProductIngredientByIdController } from "@/controller/productIngredien/get-productIngredient";
import { MySqlGetProductIngredientRepository } from "@/repository/productIngredient/get-ingredient";
import { GetAllProductIngredientController } from "@/controller/productIngredien/get-all-productIngredient"
import { MySqlGetAllProductIngredientRepository } from "@/repository/productIngredient/get-all-ingredient"
import { Router } from "express";
import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";
import { UpdateSpecificProductIngredientController } from "@/controller/productIngredien/update-specificProductIngredient";

const routes = Router();

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

    const { body, statusCode } = await getProductIngredientController.handle()

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

export { routes as ProductIngredientRoutes };