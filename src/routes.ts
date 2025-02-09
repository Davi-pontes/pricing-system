import { Router } from "express";
import { ProductRoutes } from "./routes/product.routes";
import { ProductIngredientRoutes } from "./routes/productIngredients.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { StockRoutes } from "./routes/stock.routes";
import { UserRoutes } from "./routes/user.routes";
import { LoginRoutes } from "./routes/login.routes";
import { OrderRoutes } from "./routes/order.routes";
import { PaymentMethodRoutes } from "./routes/paymentMethod.routes";
import { UploadXlsx } from "./routes/upload-xlsx.routes";
//import { PublicUserRoutes } from "./routes/public/user.routes";
import { CreateUserController } from "./controller/user/create-user";
import { CalculateRoutes } from "./routes/calculation.routes";

const routes = Router()

routes.get("/",(req,res)=> {res.json({message: "hello"})})
routes.post("/user/sign-up", async (req, res) => {
    const createUserController = new CreateUserController()

    const { body, statusCode } = await createUserController.handle({
        body: req.body
    })
    res.status(statusCode).send(body)
})
//routes.use('/sign-up', PublicUserRoutes)
routes.use('/product', ProductRoutes)
routes.use('/product/ingredient', ProductIngredientRoutes)
routes.use('/category', CategoryRoutes)
routes.use('/stock', StockRoutes)
routes.use('/user', UserRoutes)
routes.use('/login', LoginRoutes)
routes.use('/order', OrderRoutes)
routes.use('/payment/method', PaymentMethodRoutes)
routes.use('/upload', UploadXlsx)
routes.use('/calculate',CalculateRoutes)

export { routes }