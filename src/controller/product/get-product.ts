import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IGetProduct, IGetProductRepository, IProduct } from "@/interfaces/product";

export class GetProductController implements IController{
    constructor(private readonly getProductRepository: IGetProductRepository){}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IGetProduct | string>> {
       try {
        const idUser = httpRequest.params.idUser

        const allProducts = await this.getProductRepository.getProduct(idUser)

        const totalProducts = allProducts.length

        return ok<IGetProduct>({totalProducts,allProducts})
        
       } catch (error) {
        return serverError()
       }
    }

    async getProductById(id_product: string) : Promise<HttpResponse<IProduct | string>>{
        try {
            const product = await this.getProductRepository.getProductById(id_product)
    
            return ok<IProduct>(product)
            
           } catch (error) {
            return serverError()
           }
        }

    async getProductJoker(httpRequest: HttpRequest<any>): Promise<HttpResponse<IProduct[] | string>> {
        try {
            const idUser = httpRequest.params.idUser
            const productJoker = await this.getProductRepository.getProductJoker(idUser)

            return ok<IProduct []>(productJoker)
        } catch (error) {
            return serverError()
        }

    }
    }