import "dotenv/config"
// Update with your config settings.

export default{
    client: process.env.KNEX_CLIENT,
    connection: {
      user: process.env.KNEX_USER,
      password: process.env.KNEX_PASSWORD,
      host: process.env.KNEX_HOST,
      port: Number(process.env.KNEX_PORT),
      database: process.env.KNEX_DATABASE
    },
    migrations:{
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds/dev'
    }
}