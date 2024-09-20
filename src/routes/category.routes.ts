import { CreateCategoryController } from "@/controller/category/create-category";
import { DeleteCategoryController } from "@/controller/category/delete-category";
import { GetCategoryController } from "@/controller/category/get-category";
import { UpdateCategoryController } from "@/controller/category/update-category";
import { MySqlCreateCategoryRepository } from "@/repository/category/create-category";
import { MySqlDeleteCategoryRepository } from "@/repository/category/delete-category";
import { MySqlGetCategoryRepository } from "@/repository/category/get-category";
import { MySqlUpdateCategoryRepository } from "@/repository/category/update-category";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req,res) => {
    const mySqlGetCategoryRepository = new MySqlGetCategoryRepository()

    const getCategoryController = new GetCategoryController(mySqlGetCategoryRepository)

    const {body,statusCode} = await getCategoryController.handle({
        params: req.query
    })

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

routes.patch("/", async(req,res) => {
    const mySqlUpdateCategoryRepository = new MySqlUpdateCategoryRepository()

    const updateCategoryController = new UpdateCategoryController(mySqlUpdateCategoryRepository)

    const {body,statusCode} = await updateCategoryController.handle({
        body: req.body
    })

    res.status(statusCode).send(body)
})

routes.delete("/", async(req,res) => {
    const mySqlDeleteCategoryRepository = new MySqlDeleteCategoryRepository()

    const deleteCategoryController = new DeleteCategoryController(mySqlDeleteCategoryRepository)

    const {body,statusCode} = await deleteCategoryController.handle({
        params: req.query
    })

    res.status(statusCode).send(body)
})

export {routes as CategoryRoutes}