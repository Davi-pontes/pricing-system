import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";
import { UpdateSpecificProductIngredientController } from "@/controller/productIngredien/update-specificProductIngredient";

const mySqlGetSpecificProductIngredientRepository = new MySqlUpdateSpecificProductIngredientRepository()

const getSpecificProductIngredientController = new UpdateSpecificProductIngredientController(mySqlGetSpecificProductIngredientRepository)

test('Update Product Ingredient', async () => {
    const response = await getSpecificProductIngredientController.handle({
        body: {
            changeInformation: {
                "name": "trigo",
                "price": 4
            },
            idUser: "8oZ_9G8At"
        }
    });

    const expectedResponse = {
        body: {
            updatedNumbersIngredient: {
                "quantityOfProductsChanged": 2,
                "updatedIngredientCost": 1
            },
            updatedIngredient: {
                "id": 2,
                "name": "trigo",
                "weight": 1000,
                "unit1": "GRAMAS",
                "price": 4,
                "quantity": 200,
                "unit2": "GRAMAS",
                "ingredient_cost": 1.2,
                "id_product": "Q3cdT8fmJ",
                "quantity_in_stock": 0,
                "total_cash_in_stock": 0,
                "updated_at": "2024-10-14 16:34:51"
            }
        },
        statusCode: 200, 
    };

    expect(response).toStrictEqual(expectedResponse);
});