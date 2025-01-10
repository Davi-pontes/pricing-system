import { IOrderItemsParams } from "./orderItems";

export interface IOrder {
  id: number;
  discount: number;
  type_payment_method: number;
  tax: number;
  sub_total: number;
  total: number;
  id_user: string;
}

export interface ICreateOrderParams {
    discount: number;
    type_payment_method: number;
    tax: number;
    sub_total: number;
    total: number;
    id_user: string;
}
export interface ICreateOrder {
  orderSummary: ICreateOrderParams
  orderItems: IOrderItemsParams[]
}
export interface ICreateOrderRepository {
  createOrder(params: ICreateOrderParams): Promise<IOrder>;
}
export interface ICreateOrderService {
  createOrder(params: ICreateOrder): Promise<IOrder>;
}
