import { GetProductIngredientByIdController } from "@/controller/productIngredien/get-productIngredient";
import { MySqlGetProductIngredientRepository } from "@/repository/productIngredient/get-ingredient";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req,res) => {
    const mySqlGetProductIngredientRepository = new MySqlGetProductIngredientRepository()
    
    const getProductIngredientController = new GetProductIngredientByIdController(mySqlGetProductIngredientRepository)

    const {body,statusCode} = await getProductIngredientController.handle({
        params: req.query
    })

    res.status(statusCode).send(body)
})

export { routes as ProductIngredientRoutes };