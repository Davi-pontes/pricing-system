import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpResponse } from "@/interfaces/http";
import { IGetProductRepository, IProduct } from "@/interfaces/product";

export class GetProductController implements IController{
    constructor(private readonly getProductRepository: IGetProductRepository){}

    async handle(): Promise<HttpResponse<IProduct[] | string>> {
       try {
        const allProducts = await this.getProductRepository.getProduct()

        return ok<IProduct[]>(allProducts)
        
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

    async getProductJoker(): Promise<HttpResponse<IProduct[] | string>> {
        try {
            const productJoker = await this.getProductRepository.getProductJoker()

            return ok<IProduct []>(productJoker)
        } catch (error) {
            return serverError()
        }

    }
    }