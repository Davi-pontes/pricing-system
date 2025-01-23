import { IPaymentMethod, IUpdatePaymentMethod, IUpdatePaymentMethodService } from "@/interfaces/paymentMethod";

export class PaymentMethodService implements IUpdatePaymentMethodService{
    update(paymentMethod: IUpdatePaymentMethod[]): Promise<IPaymentMethod[]> {
        throw new Error("Method not implemented.");
    }

}