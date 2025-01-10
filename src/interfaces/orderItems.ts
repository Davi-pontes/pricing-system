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
}
export interface IOrderItemsParams {
  quantity: number;
  id_product: string;
}

export interface ICreateOrderItemsRepository {
  createOrderItems(params: ICreateOrderItems[]): Promise<any>;
}
export interface ICreateOrderItemsService {
  createOrderItems(params: ICreateOrderItems[]): Promise<any>;
}
