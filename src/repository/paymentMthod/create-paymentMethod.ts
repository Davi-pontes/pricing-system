import connection from "@/database/connectionKnex";
import { ICreatePaymentMethod, ICreatePaymentMethodRepository, IPaymentMethod } from "@/interfaces/paymentMethod";

export class MySqlCreatePaymentMethodRepository implements ICreatePaymentMethodRepository{
    
    async createPaymentMehod(params: ICreatePaymentMethod[]): Promise<IPaymentMethod> {
        try {
            const [insertedId] = await connection.insert(params).table('payment_method')

            const paymentMethod = await connection.select('*').table('payment_method').where({id: insertedId})

            return paymentMethod[0]
        } catch (error) {
            console.log(error);
            
            throw new Error("Payment method not created")
        }
    }

}