import { IGetPaymentMethodRepository, IGetPaymentMethodService, IPaymentMethod } from "@/interfaces/paymentMethod";
import { MySqlGetPaymentMethodRepository } from "@/repository/paymentMthod/get-paymentMethod";

export class GetPaymentMethodService implements IGetPaymentMethodService{
    constructor (private readonly getPaymentMethodRepository: IGetPaymentMethodRepository){}
    
    async getByActiveUserId(idUser: string): Promise<IPaymentMethod[]> {
        const allPaymentMethodActive = await this.getPaymentMethodRepository.getByActiveUserId(idUser)
        console.log(allPaymentMethodActive);
        
        return allPaymentMethodActive
    }

    
}

const repository = new MySqlGetPaymentMethodRepository()

const service = new GetPaymentMethodService(repository)

service.getByActiveUserId('8oZ_9G8At')