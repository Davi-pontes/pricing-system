import { ICreateOrderItems, ICreateOrderItemsRepository, ICreateOrderItemsService } from "@/interfaces/orderItems";

export class CreateOrderItemsService implements ICreateOrderItemsService{
    
    constructor (private readonly createOrderItemsRepository: ICreateOrderItemsRepository){}
    
    async createOrderItems(params: ICreateOrderItems[]): Promise<any> {

        for(let items of params){
            
            const createdOrderItems = await this.createOrderItemsRepository.createOrderItems(params)


        }

        return ''
    }
    
}