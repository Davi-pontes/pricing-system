import { CreateCategoryController } from "@/controller/category/create-category";
import { GetCategoryController } from "@/controller/category/get-category";
import { MySqlCreateCategoryRepository } from "@/repository/category/create-category";
import { MySqlGetCategoryRepository } from "@/repository/category/get-category";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req,res) => {
    const mySqlGetCategoryRepository = new MySqlGetCategoryRepository()

    const getCategoryController = new GetCategoryController(mySqlGetCategoryRepository)

    const {body,statusCode} = await getCategoryController.handle()

    res.status(statusCode).send(body)
})

routes.post("/", async(req,res) => {
    const mySqlCreateCategoryRepository = new MySqlCreateCategoryRepository()

    const createCategoryController = new CreateCategoryController(mySqlCreateCategoryRepository)

    const{body,statusCode} = await createCategoryController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})

export {routes as CategoryRoutes}