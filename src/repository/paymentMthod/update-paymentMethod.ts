import { IPaymentMethod, IUpdatePaymentMethod, IUpdatePaymentMethodRepository } from "@/interfaces/paymentMethod";
import connection from "@/database/connectionKnex";

export class MySqlUpdatePaymentMethodRepository implements IUpdatePaymentMethodRepository {
    async updatePaymentMehod(params: IUpdatePaymentMethod, idUser: string): Promise<number> {
        try {
            const result = await connection
            .update(params)
            .table('payment_method')
            .where('id_user', idUser)
            .where('id', params.id)

            return result
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}