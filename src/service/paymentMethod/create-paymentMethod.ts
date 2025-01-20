import { ICreatePaymentMethod, ICreatePaymentMethodRepository, ICreatePaymentMethodService, TypePayment } from "@/interfaces/paymentMethod";

export class CreatePaymentMethodService implements ICreatePaymentMethodService{
    constructor (private readonly createPaymentMethodRepository: ICreatePaymentMethodRepository){}

    async create(paymentMethodData: ICreatePaymentMethod[]){
        const inserted = await this.createPaymentMethodRepository.createPaymentMehod(paymentMethodData)

        return inserted
    }
}