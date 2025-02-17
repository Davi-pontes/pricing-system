import type { JwtPayload } from 'jsonwebtoken'

export interface ILogin {
    email: string
    password: string
}

export interface ILoginAuthorized {
    id: string
    name: string
    first_access: Date
    active: number
}

export interface IGetLoginRepository {
    getLogin(params: ILogin): Promise<ILoginAuthorized>
}

export interface ILoginService {
    loginService(dataForLogin: ILogin): Promise<any>
}

export interface IValidateTokenService {
    validateToken(token: string): string | JwtPayload
}