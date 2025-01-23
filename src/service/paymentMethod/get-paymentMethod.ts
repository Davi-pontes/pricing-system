import { IGetPaymentMethodRepository, IGetPaymentMethodService, IPaymentMethod } from "@/interfaces/paymentMethod";

export class GetPaymentMethodService implements IGetPaymentMethodService{
    constructor (private readonly getPaymentMethodRepository: IGetPaymentMethodRepository){}
    
    async getByActiveUserId(idUser: string): Promise<IPaymentMethod[]> {
        const allPaymentMethodActive = await this.getPaymentMethodRepository.getByActiveUserId(idUser)
            
        return allPaymentMethodActive
    }
}