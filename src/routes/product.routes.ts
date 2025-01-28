import { CreateProductController } from "@/controller/product/create-product";
import { DeleteProductController } from "@/controller/product/delete-product";
import { DuplicateProductController } from "@/controller/product/duplicate-product";
import { GetProductController } from "@/controller/product/get-product";
import { UpdateProductAndProductIngredientController } from "@/controller/product/update-product";
import { MySqlCreateProductRepository } from "@/repository/product/create-product";
import { MySqlDeleteProductRepository } from "@/repository/product/delete-product";
import { MySqlGetProductRepository } from "@/repository/product/get-product";
import { MySqlUpdateProductRepository } from "@/repository/product/update-product";
import { Router } from "express";
import { storage } from "@/config/multerConfig";
import multer from "multer";
import { CreateSingleProductController } from "@/controller/product/createSingle-product";
import { AuthMidlleware } from "@/middleware/auth";

const routes = Router();

const upload = multer({ storage: storage });

const authMidlleware = new AuthMidlleware();

routes.use(authMidlleware.validateToken);

routes.get("/", async (req, res) => {
  const mySqlGetRepository = new MySqlGetProductRepository();

  const getProductController = new GetProductController(mySqlGetRepository);

  const { body, statusCode } = await getProductController.handle({
    params: req.query,
  });

  res.status(statusCode).send(body);
});
// Pegar um produto especifico pelo id
routes.get("/specific", async (req, res) => {
  const mySqlGetRepository = new MySqlGetProductRepository();

  const getProductController = new GetProductController(mySqlGetRepository);

  const id_product = req.query.id as string;

  const { body, statusCode } = await getProductController.getProductById(
    id_product
  );

  res.status(statusCode).send(body);
});

routes.get("/joker", async (req, res) => {
  const mySqlGetRepository = new MySqlGetProductRepository();

  const getProductController = new GetProductController(mySqlGetRepository);

  const { body, statusCode } = await getProductController.getProductJoker({
    params: req.query,
  });

  res.status(statusCode).send(body);
});

routes.post("/", async (req, res) => {
  const mySqlCreateProductRepository = new MySqlCreateProductRepository();

  const createProductController = new CreateProductController(
    mySqlCreateProductRepository
  );

  const { body, statusCode } = await createProductController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

routes.post("/duplicate", async (req, res) => {
  const duplicateProduct = new DuplicateProductController();

  const { body, statusCode } = await duplicateProduct.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

routes.post("/only", async (req, res) => {
  const mySqlCreateProductRepository = new MySqlCreateProductRepository();

  const createSingleProductController = new CreateSingleProductController(
    mySqlCreateProductRepository
  );

  const { body, statusCode } = await createSingleProductController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});
routes.put("/only", async (req, res) => {
  const mySqlUpdateProductRepository = new MySqlUpdateProductRepository();

  const updateProductAndProductIngredientController =
    new UpdateProductAndProductIngredientController(
      mySqlUpdateProductRepository
    );

  const { body, statusCode } =
    await updateProductAndProductIngredientController.updateOnlyProductController(
      {
        params: req.query,
        body: req.body,
      }
    );
  res.status(statusCode).send(body);
});

routes.put("/", async (req, res) => {
  const mySqlUpdateProductRepository = new MySqlUpdateProductRepository();

  const updateProductAndProductIngredientController =
    new UpdateProductAndProductIngredientController(
      mySqlUpdateProductRepository
    );

  const { body, statusCode } =
    await updateProductAndProductIngredientController.handle({
      params: req.body.params,
      body: req.body,
    });

  res.status(statusCode).send(body);
});

routes.delete("/", async (req, res) => {
  const mySqlDeleteProductRepository = new MySqlDeleteProductRepository();

  const deleteProductController = new DeleteProductController(
    mySqlDeleteProductRepository
  );

  const { body, statusCode } = await deleteProductController.handle({
    params: req.query,
  });

  res.status(statusCode).send(body);
});

export { routes as ProductRoutes };
