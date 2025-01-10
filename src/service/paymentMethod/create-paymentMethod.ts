import { ICreatePaymentMethod, ICreatePaymentMethodRepository, ICreatePaymentMethodService, TypePayment } from "@/interfaces/paymentMethod";
import { MySqlCreatePaymentMethodRepository } from "@/repository/paymentMthod/create-paymentMethod";

export class CreatePaymentMethodService implements ICreatePaymentMethodService{
    constructor (private readonly createPaymentMethodRepository: ICreatePaymentMethodRepository){}

    async create(paymentMethodData: ICreatePaymentMethod[]){
        const inserted = await this.createPaymentMethodRepository.createPaymentMehod(paymentMethodData)

        return inserted
    }
}

// const repository = new MySqlCreatePaymentMethodRepository()

// const service = new CreatePaymentMethodService(repository)

// service.create(
//     [{
//         id_user: '8oZ_9G8At',
//         status: 1,
//         type: TypePayment.money,
//         tax: 0
//     },
//     {
//         id_user: '8oZ_9G8At',
//         status: 1,
//         type: TypePayment.credit_card,
//         tax: 4.53
//     },
//     {
//         id_user: '8oZ_9G8At',
//         status: 1,
//         type: TypePayment.debit_card,
//         tax: 2.6
//     },
//     {
//         id_user: '8oZ_9G8At',
//         status: 1,
//         type: TypePayment.ticket,
//         tax: 0
//     },
//     {
//         id_user: '8oZ_9G8At',
//         status: 1,
//         type: TypePayment.pix,
//         tax: 0
//     }]
// )