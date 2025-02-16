export interface IProductIngredient{
    id: number
    name: string
    weight: number
    unit1: string
    price: number
    quantity: number
    unit2?: string
    ingredient_cost: number
    id_product: string
    quantity_in_stock: number
    total_cash_in_stock: number
    updated_at?: string
}
export interface ICreateProductIngredientParams{
    name: string
    weight: number
    unit1: string
    price: number
    ingredient_cost: number
    quantity: number
    id_product?: string
    quantity_in_stock?: number
    total_cash_in_stock?: number
}

export interface IUpdateProductIngredient{
    name?: string
    weight?: number
    unit1?: string
    price?: number
    unit2?: string
    ingredient_cost?: number
    id_product?: string
    quantity_in_stock?: number
    total_cash_in_stock?: number
}

export interface IValidatePropsProductIngredient {
    success: boolean
    data?: ICreateProductIngredientParams
    error?: unknown
}

export interface ICreateProductIngredientRepository {
    createProductIngredient(params: ICreateProductIngredientParams[]): Promise<IProductIngredient>
}

export interface ICreateProductController {
    handle(params: Array<ICreateProductIngredientParams>): Promise<IProductIngredient>
}

export interface IGetProductIngredient{
    getProductIngredient(idProduct: string): Promise<IProductIngredient[]>
}
export interface IGetSpecificProductIngredient{
    getSpecificProductIngredient(idProductIngredient: string): Promise<IProductIngredient>
}
export interface IGetAllProductIngredient{
    getAllProductIngredient(idUser:string): Promise<IProductIngredient[]>
}

export interface IGetIngredientByName{
    getIngredientByName(nameProductIngredient: string,idUser:string): Promise<Array<object>>
}

export interface IDeleteProductIngredientRepository{
    deleteProductIngredient(product_id_product: string): Promise<IProductIngredient>
}

export interface IDeleteProductIngredientController{
    DeleteProductIngredientController(id_product: string): Promise<IProductIngredient>
}

export interface IUpdateProductIngredientController{
    updateProductIngredientController(id_product: string, params: IUpdateProductIngredient[]): Promise<IProductIngredient>
}

export interface IUpdateSpecificProductIngredientController{
    updateSpecificProductIngredientController(id_product: string, params: IUpdateProductIngredient): Promise<IProductIngredient>
}

export interface IUpdateSpecificProductIngredientRepository{
    updateSpecificProductIngredientController(id_productIngredient: number, params: IUpdateProductIngredient): Promise<number>
}

export interface IUpdateStockRepository{
    updateStock(id_productIngredient: number, params: IUpdateProductIngredient): Promise<number>
}