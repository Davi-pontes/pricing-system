import { IGetUserRepository, IGetUserService, IUser } from "@/interfaces/user";

export class GetUserService implements IGetUserService{
    constructor(private readonly getUserRepository: IGetUserRepository){}
    
    async getAllUser(): Promise<IUser[]> {
        try {
            const allUsers = await this.getUserRepository.getUser()

            return allUsers
        } catch (error) {
            throw new Error("Not possible get user.");
        }
    }
    async getUserById(idUser: string): Promise<IUser> {
        try {
            const user = await this.getUserRepository.getUserById(idUser)

            return user
        } catch (error) {
            throw new Error("Not possible get user.");
        }
        
    }

}