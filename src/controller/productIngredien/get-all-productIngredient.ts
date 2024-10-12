import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetAllProductIngredientRepository } from "@/repository/productIngredient/get-all-ingredient";

export class GetAllProductIngredientController implements IController {
  constructor(
    private readonly mySqlGetAllProductIngredientRepository: MySqlGetAllProductIngredientRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IProductIngredient[] | string>> {
    try {
      const idUser = httpRequest.params.idUser;

      const productsIngredients =
        await this.mySqlGetAllProductIngredientRepository.getAllProductIngredient(
          idUser
        );
        const newArray = productsIngredients.filter((value, index, self) =>
            index === self.findIndex((v) => v.name === value.name)
        );

      return ok<IProductIngredient[]>(newArray);
    } catch (error) {
      return serverError();
    }
  }
}
