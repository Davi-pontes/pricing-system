import knex from "knex"
import "dotenv/config"

const development = {
    client: process.env.KNEX_CLIENT,
    connection: {
        user: process.env.KNEX_USER,
        password: process.env.KNEX_PASSWORD,
        host: process.env.KNEX_HOST,
        port: Number(process.env.KNEX_PORT),
        database: process.env.KNEX_DATABASE
    }
}

const connection = knex(development)

export default connection