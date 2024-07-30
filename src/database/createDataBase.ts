import knex from 'knex';
import 'dotenv/config';

const initialConnection = knex({
  client: process.env.KNEX_CLIENT,
  connection: {
    user: process.env.KNEX_USER,
    password: process.env.KNEX_PASSWORD,
    host: process.env.KNEX_HOST,
    port: Number(process.env.KNEX_PORT),
  }
});

(async () => {
  try {
    await initialConnection.raw(`CREATE DATABASE IF NOT EXISTS ${process.env.KNEX_DATABASE}`);
    console.log(`Database ${process.env.KNEX_DATABASE} created or already exists.`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await initialConnection.destroy();
  }
})();
