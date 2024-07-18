export interface ICategory {
    id: string
    name: string
}
export interface IGetCategoryRepository {
    getCategory(): Promise<ICategory[]>
}

export interface ICreateCategoryRepository {
    createCategory(params: ICategory): Promise<ICategory>
}

