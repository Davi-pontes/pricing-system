export interface IOrderItems {
  id: number;
  quantity: number;
  id_order: number;
  id_product: string;
}
export interface ICreateOrderItems {
  id_order: number;
  quantity: number;
  id_product: string;
  id_stock: number
}
export interface IOrderItemsParams {
  id_order: number;
  quantity: number;
  id_product: string;
}

export interface ICreateOrderItemsRepository {
  createOrderItems(params: IOrderItemsParams): Promise<any>;
}
export interface ICreateOrderItemsService {
  createOrderItems(params: ICreateOrderItems[]): Promise<any>;
}
