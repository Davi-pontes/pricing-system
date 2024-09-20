export interface ICategory {
    id: string
    name: string
    user_id: string
}
export interface IUpdateCategoryParams {
    id: string
    name: string
    updated_at: string
}
export interface IGetCategoryRepository {
    getCategory(user_id: string): Promise<ICategory[]>
    getSpecificCategory(id_category: string): Promise<ICategory>
}

export interface ICreateCategoryRepository {
    createCategory(params: ICategory): Promise<ICategory>
}

export interface IUpdateCategoryRepository {
    updateCategory(id_category: string, params: IUpdateCategoryParams): Promise<number>
}

export interface IDeleteCategoryRepository {
    deleteCategory(id_category: string): Promise<number>
}