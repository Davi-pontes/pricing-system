import { ETypePayment, ETypePaymentFE, IGetPaymentMethodRepository, IGetPaymentMethodService, IPaymentMethod, IPaymentMethodFE } from "@/interfaces/paymentMethod";

export class GetPaymentMethodService implements IGetPaymentMethodService{
    constructor (private readonly getPaymentMethodRepository: IGetPaymentMethodRepository){}
    
    async getByActiveUserId(idUser: string): Promise<IPaymentMethodFE[]> {
        const allPaymentMethodActive = await this.getPaymentMethodRepository.getByActiveUserId(idUser)
        
        const translationDone = allPaymentMethodActive.map((paymentMethod) => ({
            ...paymentMethod,
            type: this.translateToFE(paymentMethod.type),
        }));
        
        return translationDone
    }
    private translateToFE(type: ETypePayment): ETypePaymentFE {
        const typePaymentMap: Record<ETypePayment, ETypePaymentFE> = {
            [ETypePayment.money]: ETypePaymentFE.dinheiro,
            [ETypePayment.credit_card]: ETypePaymentFE.cartao_credito,
            [ETypePayment.debit_card]: ETypePaymentFE.cartao_debito,
            [ETypePayment.pix]: ETypePaymentFE.pix,
            [ETypePayment.ticket]: ETypePaymentFE.boleto
        };
        return typePaymentMap[type];
    }
}