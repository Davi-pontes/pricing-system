import connection from "@/database/connectionKnex";
import { ICreatePaymentMethod, ICreatePaymentMethodRepository, IGetPaymentMethodRepository, IPaymentMethod } from "@/interfaces/paymentMethod";

export class MySqlGetPaymentMethodRepository implements IGetPaymentMethodRepository{
    getByActiveUserId(idUser: string): Promise<IPaymentMethod[]> {
        try {
            const allPaymentMethodTheUser = 
            connection
            .select('id', 'type', 'tax')
            .table('payment_method')
            .where('status',1)
            .where('id_user', idUser)

            return allPaymentMethodTheUser
        } catch (error) {
            throw new Error("Erro in get payment method.");
        }
    }
}