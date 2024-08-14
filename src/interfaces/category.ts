export interface ICategory {
    id: string
    name: string
    user_id: string
}
export interface IGetCategoryRepository {
    getCategory(user_id: string): Promise<ICategory[]>
}

export interface ICreateCategoryRepository {
    createCategory(params: ICategory): Promise<ICategory>
}

