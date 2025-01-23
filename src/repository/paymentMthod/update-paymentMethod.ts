import { IPaymentMethod, IUpdatePaymentMethod, IUpdatePaymentMethodRepository } from "@/interfaces/paymentMethod";
import connection from "@/database/connectionKnex";

export class MySqlUpdatePaymentMethodRepository implements IUpdatePaymentMethodRepository {
    async updatePaymentMehod(params: IUpdatePaymentMethod[], idUser: string): Promise<any> {
        try {
            const result = await connection
            .update(params)
            .table('payment_method')
            .where('id_user', idUser)

            return result
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}