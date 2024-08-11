import { Router } from "express";
import { ProductRoutes } from "./routes/product.routes";
import { ProductIngredientRoutes } from "./routes/productIngredients.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { StockRoutes } from "./routes/stock.routes";
import { UserRoutes } from "./routes/user.routes";

const routes = Router()

routes.get("/",(req,res)=> {res.json({message: "hello"})})
routes.use('/product', ProductRoutes)
routes.use('/product/ingredient', ProductIngredientRoutes)
routes.use('/category', CategoryRoutes)
routes.use('/stock', StockRoutes)
routes.use('/user', UserRoutes)

export { routes }