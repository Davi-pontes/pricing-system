import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetCategoryRepository } from "@/repository/category/get-category";
import { MySqlUpdateCategoryRepository } from "@/repository/category/update-category";
import { GetCategoryController } from "./get-category";
import { ICategory } from "@/interfaces/category";

export class UpdateCategoryController implements IController {
    constructor(private readonly mySqlUpdateCategoryRepository: MySqlUpdateCategoryRepository) { }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            if (!httpRequest.body) return badRequest('Please specify a body')

            const body = httpRequest.body

            const id_category = body.idCategory

            const params = body.params

            const categoryUpdated = await this.mySqlUpdateCategoryRepository.updateCategory(id_category, params)

            if(categoryUpdated === 0) return serverError()

            const mySqlGetCategoryRepository = new MySqlGetCategoryRepository()

            const getCategoryController = new GetCategoryController(mySqlGetCategoryRepository)

            const specificCategory = await getCategoryController.getSpecificCategory(id_category)

            return ok<ICategory>(specificCategory)
        } catch (error) {
            return serverError()
        }
    }
}