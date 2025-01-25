import knex from "knex";
import "dotenv/config";

let connection;

(async () => {
  try {
    const config = {
      client: process.env.KNEX_CLIENT,
      connection: {
        user: process.env.KNEX_USER,
        password: process.env.KNEX_PASSWORD,
        host: process.env.KNEX_HOST,
        port: Number(process.env.KNEX_PORT),
      },
    };

    connection = knex(config);

    await connection.raw(`CREATE DATABASE ${process.env.KNEX_DATABASE}`);

    console.log("Banco de dados criado com sucesso!");
  } catch (error) {
    console.log(error);
  } finally {
    connection?.destroy();
  }
})();
