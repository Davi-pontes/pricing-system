export interface IPaymentMethod{
    id: number
    id_user: string
    type: ETypePayment
    tax: number
    status: number
}
export interface IPaymentMethodFE{
    id: number
    id_user: string
    type: ETypePaymentFE
    tax: number
    status: number
}
export interface ICreatePaymentMethod{
    id_user: string
    type: ETypePayment
    tax: number
    status: number
}

export enum ETypePayment {
    money = 'money',
    credit_card = 'credit_card',
    debit_card = 'debit_card',
    pix = 'pix',
    ticket = 'ticket'
}
export enum ETypePaymentFE {
    dinheiro = 'Dinheiro',
    cartao_credito = 'Cartão de crédito',
    cartao_debito = 'Cartão de débito',
    pix = 'Pix',
    boleto = 'Boleto'
}

export interface ICreatePaymentMethodRepository{
    createPaymentMehod(params: ICreatePaymentMethod[]): Promise<IPaymentMethod>
}
export interface ICreatePaymentMethodService{
    create(params: ICreatePaymentMethod[]): Promise<IPaymentMethod>
}

export interface IGetPaymentMethodRepository{
    getByActiveUserId(idUser: string): Promise<IPaymentMethod[]>
}
export interface IGetPaymentMethodService{
    getByActiveUserId(idUser: string): Promise<IPaymentMethodFE[]>
}