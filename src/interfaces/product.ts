import { HttpRequest } from "./http"
import { IProductIngredient } from "./productIngredients"

export interface IProduct {
    id_product: string
    name: string
    income: number
    recipe_time: number
    profit_percentage: number
    revenue_cost: number
    fixed_cost: number
    labor: number
    profit: number
    final_recipe_price: number
    price_per_unit: number
    operacional_cost: number
    cost_of_all_ingredients: number
    update_at?: number | null
    chengeIncome?: number
    id_category: string
    description: string
    tax: number 
    freight: number 
    workforce: number 
    qtd_box: number 
}
export interface ISingleProduct{
    nameProduct: string
    priceProduct: number
    descriptionProduct: string
    idCategory: string
    tax: number 
    freight: number 
    workforce: number 
    qtd_box: number 
}
export interface ICreateProductParams {
    name: string
    income: number
    recipe_time: number
    profit_percentage: number
    revenue_cost: number
    fixed_cost: number
    labor: number
    profit: number
    final_recipe_price: number
    cost_of_all_ingredients: number
    price_per_unit: number
    id_category: string
    description: string
}

export interface IUpdateProductParams {
    name?: string
    income?: number
    recipe_time?: number
    profit_percentage?: number
    revenue_cost?: number
    fixed_cost?: number
    labor?: number
    profit?: number
    final_recipe_price?: number
    price_per_unit?: number
    cost_of_all_ingredients?:number
    update_at?: number | null
}

export interface IValidatePropsProduct {
    success: boolean
    data?: ICreateProductParams
    error?: unknown
}

export interface IUpdateProductComingIngredient {
    id_product: string
}
export interface ICreateProductRepository {
    createProduct(params: ICreateProductParams): Promise<IProduct>
}

export interface IGetProductRepository {
    getProduct(user_id: string): Promise<IProduct[]>
    getProductById(id_product: string): Promise<IProduct>
    getProductJoker(user_id: string): Promise<IProduct[] | null>
}

export interface IUpdateProductRepository {
    updateProduct(id_product: string, params: IUpdateProductParams): Promise<IProduct>
}

export interface IDeleteProductRepository {
    deleteProduct(id_product: string): Promise<IProduct>
}

export interface IUpdateProductComingIngredientController{
    updateProduct(allProductIngredientsByName: Array<IUpdateProductComingIngredient>, ingredientPreviousProduct: IProductIngredient, currentPrice: number): Promise<number>
}