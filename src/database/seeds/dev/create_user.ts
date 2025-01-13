import { IdGenerator } from "../../../generators/idGenerator";
import { Hash } from "../../..//utils/hash";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
        //await knex("table_name").del();
        
        const id = await IdGenerator.generator()
        // Inserts seed entries
        await knex("users").insert([
            {
                id: id,
                name: "Teste seed",
                phone_number: '81888888888',
                email: 'seedTeste@teste.com',
                password: Hash.create('seed'),
                is_admin: 1,
            },
        ]);
        await knex("category").insert([
            {
                id: await IdGenerator.generator(),
                name: "Teste seed",
                user_id: id
            },
        ]);
};
