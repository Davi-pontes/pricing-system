import { IOrderItemsParams } from "./orderItems";

export interface INecessaryStock {
  name: string;
  quantityCurrent: number;
  necessaryAmount: number;
  state: string | null;
  quantityToBuy: number;
}

export interface IStockProduct {
  id_product: string;
  name: string
  id_stock: number;
  quantity: number;
  updated_at: string
}
export interface ICreateStockProduct {
  quantity: number;
  id_product: string;
}
export interface IOutPutStock {
  id?: number;
  quantity: number;
  id_stock: number;
  updated_at?: string
}
export interface IOutPutStockByProduct {
  id?: number;
  quantity: number;
  id_stock: number;
}
export interface IEntryStock {
  id?: number;
  quantity: number;
  id_stock: number;
  updated_at?: string
}
export interface ICreateStockRepository {
  createSctock(params: ICreateStockProduct): Promise<any>;
}
export interface IEntryStockRepository {
  registerStockEntry(params: IEntryStock): Promise<any>;
}
export interface IOutPutStockRepository {
  registerOutPutStock(params: IOutPutStock): Promise<any>;
}
export interface IGetStockProductService{
  getStockProductByIdUser(idUser: string): Promise<any>
}
export interface IGetStockRepository {
  getById(idStock: number): Promise<IStockProduct>;
  getByIdProduct(idProduct: string): Promise<IStockProduct>
  getStockProductByIdUser(idUser: string): Promise<IStockProduct[]>
}
export interface IUpdateStockRepository {
  incrementStock(params: IEntryStock): Promise<IEntryStock>;
  decrementStock(params: IOutPutStock): Promise<IOutPutStock>;
  decrementStockByProduct(params: IOrderItemsParams): Promise<IOutPutStock>;
}
