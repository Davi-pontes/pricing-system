export interface IPaymentMethod{
    id: number
    id_user: string
    type: TypePayment
    tax: number
    status: number
}
export interface ICreatePaymentMethod{
    id_user: string
    type: TypePayment
    tax: number
    status: number
}

export enum TypePayment {
    money = 'money',
    credit_card = 'credit_card',
    debit_card = 'debit_card',
    pix = 'pix',
    ticket = 'ticket'
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
    getByActiveUserId(idUser: string): Promise<IPaymentMethod[]>
}