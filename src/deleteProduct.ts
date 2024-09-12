import { DeleteProductController } from "./controller/product/delete-product";
import { GetProductController } from "./controller/product/get-product";
import { MySqlDeleteProductRepository } from "./repository/product/delete-product";
import { MySqlGetProductRepository } from "./repository/product/get-product";

const deleteProduct = async () => {
    try {
        console.time('executionFunction')
        const mySqlGetRepository = new MySqlGetProductRepository()

        const getProductController = new GetProductController(mySqlGetRepository)

        const allProduct = await getProductController.handle({
            params: { idUser: '8oZ_9G8At' }
        })
        console.log('Total de produtos', allProduct.body.length);

        const mySqlDeleteProductRepository = new MySqlDeleteProductRepository()

        const deleteProductController = new DeleteProductController(mySqlDeleteProductRepository)

        for (let i = 0; i < 5600; i++) {
            const deletedProduct = await deleteProductController.handle({
                params: { id: allProduct.body[i].id_product }
            })
        }
        console.timeEnd('executionFunction')
        return
    } catch (error) {
        console.log(error);

    }
}

deleteProduct()