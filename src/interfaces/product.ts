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
    update_at: number | null
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
    update_at?: number | null
}

export interface IValidatePropsProduct {
    success: boolean
    data?: ICreateProductParams
    error?: unknown
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