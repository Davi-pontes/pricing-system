import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlDeleteCategoryRepository } from "@/repository/category/delete-category";

export class DeleteCategoryController implements IController{
    constructor(private readonly mySqlDeleteCategoryRepository: MySqlDeleteCategoryRepository){}

    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            if(!httpRequest.params){
                return badRequest('Please specify a params')
            }
            const id_category = httpRequest.params.id

            await this.mySqlDeleteCategoryRepository.deleteCategory(id_category)

            return ok<any>(id_category)
        } catch (error) {
            return serverError()
        }
    }

}