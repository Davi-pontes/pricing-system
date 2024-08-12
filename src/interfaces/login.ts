export interface ILogin {
    email: string
    password: string
}

export interface ILoginAuthorized{
    id: string
    name: string
}

export interface IGetLogin{
    getLogin(params: ILogin): Promise<ILoginAuthorized>
}