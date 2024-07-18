import { IdGenerator } from "@/generators/idGenerator";
import { badRequest, created, ok, serverError } from "@/helper/helper";
import { ICategory, ICreateCategoryRepository } from "@/interfaces/category";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { VCategory } from "@/validations/category/category";

export class CreateCategoryController implements IController{
    constructor(private readonly createCategoryRepository: ICreateCategoryRepository) {}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<ICategory|string>> {
        try {
            if(!httpRequest.body){
                return badRequest('Please specify a body')
            }

            const datasCategory = httpRequest.body

            const validaPropsCategory = await VCategory.ValidatePropsCategory(datasCategory)

            if (!validaPropsCategory.success) {
                return badRequest(`Error in validation`)
            }

            const idCategory = await IdGenerator.generator()

            datasCategory.id = idCategory

            const category = await this.createCategoryRepository.createCategory(datasCategory)

            return created<ICategory>(category)

        } catch (error) {
            return serverError()
        }
    }

}