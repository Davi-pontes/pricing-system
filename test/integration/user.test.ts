//DESCRIBE -> bloco test - test suites
//IT or TEST -> declara unico teste unitario - test case
//EXPECT -> asserções do resultado

import { CreateUserController } from "@/controller/user/create-user"
import { MySqlCreateUserRepository } from "@/repository/user/create-user"

jest.mock('@/repository/user/create-user')

describe("User controller", () => {
    test("Create user in data base.", async () => {
        const request = {
            body: {
                name: "Teste Jest",
                phone_number: '81888888888',
                email: 'jestTeste@teste.com',
                password: '123456',
                is_admin: 1,
            }
        }
        
        const createuserRepository = new MySqlCreateUserRepository()

        const createUserController = new CreateUserController(createuserRepository)

        const result = await createUserController.handle({
            body: request.body
        })
        
        expect(createuserRepository.createUser).toHaveBeenCalledTimes(1)
        expect(createuserRepository.createUser)
        expect(result.statusCode).toBe(200)
    })
})