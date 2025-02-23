import { GetDataToDashboardController } from "@/controller/dashboard/get-datas";
import { Router } from "express";

const routes = Router()

routes.get("/", async (req, res) => {
    const getDataToDashboardController = new GetDataToDashboardController()

    const { body, statusCode } = await getDataToDashboardController.handle({
        params: req.query
    })
    
    res.status(statusCode).send(body)
})

export { routes as DashboardRoutes }