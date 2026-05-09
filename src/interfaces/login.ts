import type { JwtPayload } from 'jsonwebtoken'

export interface ILogin {
    email: string
    password: string
}

export interface ILoginAuthorized {
    id: string
    name: string
    email: string
    is_admin: number
    first_access: Date
    active: number
    phone_number: string
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