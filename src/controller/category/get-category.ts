import { ok, serverError } from "@/helper/helper";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetProductRepository } from "@/repository/product/get-product";

export class GetCategoryController implements IController{
    constructor(private readonly getCategoryRepository: IGetCategoryRepository) {}

    async handle(): Promise<HttpResponse<any>> {
        try {
            const allCategory = await this.getCategoryRepository.getCategory()

            const categoriesProducts = await this.AssembleDatasCategoriesAndProducts(allCategory)

            return ok<Array<any>>(categoriesProducts)
            
        } catch (error) {
            return serverError()
        }
    }

    private async  AssembleDatasCategoriesAndProducts(categories: Array<ICategory>){
        const datas = []

        const getProductByCategory = new MySqlGetProductRepository()

        for(let category of categories){
            const categoryProducts = await getProductByCategory.getProductByIdCategory(category.id)
            datas.push({category,products: categoryProducts})
        }
        
        return datas
    }

}