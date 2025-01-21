import { IdGenerator } from "@/generators/idGenerator";
import { ICreateUserParams, ICreateUserRepository, ICreateUserService, IUser } from "@/interfaces/user";
import { MySqlCreatePaymentMethodRepository } from "@/repository/paymentMthod/create-paymentMethod";
import { Hash } from "@/utils/hash";
import { CreatePaymentMethodService } from "../paymentMethod/create-paymentMethod";
import { TypePayment } from "@/interfaces/paymentMethod";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { GetUserController } from "@/controller/user/get-user";
import { GetUserService } from "./get-user";

export class CreateUserService implements ICreateUserService {
    constructor(private readonly createUserRespository: ICreateUserRepository) { }

    async createUser(params: ICreateUserParams): Promise<IUser> {
        try {
            const dataForCreateUser = params
            
            dataForCreateUser.id = IdGenerator.generator()

            dataForCreateUser.password = Hash.create(dataForCreateUser.password)

            await this.createUserRespository.createUser(dataForCreateUser)

            const paymentMethodRepository = new MySqlCreatePaymentMethodRepository()

            const paymentMethodService = new CreatePaymentMethodService(paymentMethodRepository)

            const paymentMethodDefault = [{
                id_user: dataForCreateUser.id,
                status: 1,
                type: TypePayment.money,
                tax: 0
            },
            {
                id_user: dataForCreateUser.id,
                status: 1,
                type: TypePayment.credit_card,
                tax: 0
            },
            {
                id_user: dataForCreateUser.id,
                status: 1,
                type: TypePayment.debit_card,
                tax: 0
            },
            {
                id_user: dataForCreateUser.id,
                status: 1,
                type: TypePayment.ticket,
                tax: 0
            },
            {
                id_user: dataForCreateUser.id,
                status: 1,
                type: TypePayment.pix,
                tax: 0
            }]

            await paymentMethodService.create(paymentMethodDefault)

            const getUserRepository = new MySqlGetUserRepository()

            const getUserService = new GetUserService(getUserRepository)

            const userCreated = await getUserService.getUserById(dataForCreateUser.id)
            
            return userCreated
        } catch (error) {
            throw new Error('Not created user')
        }
    }

}