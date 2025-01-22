import { ok, serverError } from "@/helper/helper";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetProductRepository } from "@/repository/product/get-product";

export class GetCategoryController implements IController {
    constructor(private readonly getCategoryRepository: IGetCategoryRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            const user_id = httpRequest.params.idUser

            const allCategory = await this.getCategoryRepository.getCategory(user_id)

            const categoriesProducts = await this.AssembleDatasCategoriesAndProducts(allCategory)

            return ok<any>({ category: allCategory, products: categoriesProducts })

        } catch (error) {
            return serverError()
        }
    }

    async getSpecificCategory(id_category: string): Promise<HttpResponse<any>> {
        try {
            const specificCategory = await this.getCategoryRepository.getSpecificCategory(id_category)

            return ok<any>(specificCategory)
        } catch (error) {
            return serverError()
        }
    }

    private async AssembleDatasCategoriesAndProducts(categories: Array<ICategory>) {
        const datas = []

        const getProductByCategory = new MySqlGetProductRepository()

        for (let category of categories) {
            const categoryProducts = await getProductByCategory.getProductByIdCategory(category.id)

            const addNameCategoryInAllProduct = categoryProducts.map((it) => ({ ...it, name_category: category.name }));

            datas.push(...addNameCategoryInAllProduct);
        }

        return datas
    }
    async getOnlyCategory(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>>{
        try {
            const idUser = httpRequest.params.idUser

            const allCategory = await this.getCategoryRepository.getCategory(idUser)

            return ok<any>(allCategory)
        } catch (error) {
           return serverError() 
        }
    }

}