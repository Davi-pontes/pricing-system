export interface IUser{
    id: string
    name: string
    phone_number: string
    email: string
    password: string
    is_admin: boolean
    created_at: string
    updated_at: string
}
export interface ICreateUserParams{
    id: string
    name: string
    phone_number: string
    email: string
    password: string
    is_admin: boolean
    created_at: string
    updated_at: string
}

export interface IUpdateUserParams{
    id: string
    name?: string
    phone_number?: string
    email?: string
    password?: string
    is_admin?: boolean
    created_at: string
    updated_at: string
}

export interface ICreateUserRepository {
    createUser(params: ICreateUserParams): Promise<number>
}

export interface IGetUserRepository {
    getUserById(id_User: string): Promise<IUser>
}
