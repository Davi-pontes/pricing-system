import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetCategoryRepository } from "@/repository/category/get-category";
import { MySqlUpdateCategoryRepository } from "@/repository/category/update-category";
import { GetCategoryController } from "./get-category";
import { ICategory } from "@/interfaces/category";

export class UpdateCategoryController implements IController {
  constructor(
    private readonly mySqlUpdateCategoryRepository: MySqlUpdateCategoryRepository
  ) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      if (!httpRequest.body)
        return badRequest("Corpo da solicitação incorreto.");
      if (!httpRequest.params) return badRequest("Parametros incompleto.");

      const categoryNameToChange = httpRequest.body;

      const idCategory = httpRequest.params.id;

      const categoryUpdated =
        await this.mySqlUpdateCategoryRepository.updateCategory(
          idCategory,
          categoryNameToChange
        );

      if (categoryUpdated === 0) return serverError();

      const mySqlGetCategoryRepository = new MySqlGetCategoryRepository();

      const getCategoryController = new GetCategoryController(
        mySqlGetCategoryRepository
      );

      const { body } = await getCategoryController.getSpecificCategory(
        idCategory
      );

      return ok<ICategory>(body);
    } catch (error) {
      return serverError();
    }
  }
}
