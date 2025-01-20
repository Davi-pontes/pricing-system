import { IOrderItemsParams } from "./orderItems";
import { HttpRequest, HttpResponse } from "./http";
export interface IOrder {
  id: number;
  discount: number;
  type_payment_method: string;
  tax: number;
  sub_total: number;
  total: number;
  id_user: string;
  created_at: string
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
  createOrder(params: ICreateOrderParams): Promise<number>;
}
export interface ICreateOrderService {
  createOrder(params: ICreateOrder): Promise<IOrder>;
}
export interface IGetOrderRepository{
  getAllOrderByIdUser(idUser: string): Promise<IOrder[]>
  getOrderByIdOrder(idOrder: number): Promise<IOrder>
  getAllOrderByIdUserAndDay(idUser: string, date: string): Promise<IOrder[]>
}
export interface IGetOrderService{
  getAllOrderByIdUser(idUser: string): Promise<IOrder[]>
  getOrderByIdOrder(idOrder: number): Promise<IOrder>
  getAllOrderByIdUserAndDay(idUser: string, date: string): Promise<IOrder[]>
}
export interface IGetOrderController{
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<IOrder[] | string>>
  handleQueryIdUserAndDay(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<IOrder[] | string>>
}
