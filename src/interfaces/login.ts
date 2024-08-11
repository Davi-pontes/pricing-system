export interface ILogin {
    email: string
    password: string
}

export interface IGetLogin{
    getLogin(params: ILogin): Promise<ILogin>
}