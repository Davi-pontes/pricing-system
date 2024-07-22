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
    update_at: number | null
    id_category: string
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
    getProduct(): Promise<IProduct[]>
    getProductById(id_product: string): Promise<IProduct>
    getProductJoker(): Promise<IProduct[] | null>
}

export interface IUpdateProductRepository {
    updateProduct(id_product: string, params: IUpdateProductParams): Promise<IProduct>
}

export interface IDeleteProductRepository {
    deleteProduct(id_product: string): Promise<IProduct>
}

export interface IUpdateProductComingIngredientController{
    updateProduct(ids_products: Array<IUpdateProductComingIngredient>, ingredientPreviousProduct: IProductIngredient, currentProductIngredient: IProductIngredient): Promise<IProductIngredient | null>
}