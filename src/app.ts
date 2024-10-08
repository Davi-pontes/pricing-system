import express, { Application } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { routes } from "./routes"
import connection from "./database/connectionKnex"
import cookieParser from "cookie-parser"
import 'dotenv/config'


class AppPrecification {
    public readonly app: Application

    constructor() {
        this.app = express()

        this.config()
        this.routes()
        this.database()
    }
    private config(): void {
        this.app.disable("x-powered-by")

        this.app.use(cors({
            origin: ['https://helqui.com.br:3000', 'https://helqui.com.br:5173' ,'http://localhost:3000','http://localhost:5173'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
        this.app.use(cookieParser())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private routes(): void {
        this.app.use(routes)
    }

    private async database(): Promise<void> {
        try {
            await connection.raw("SELECT 1");
            console.log("Conexão com o banco de dados estabelecida com sucesso!");
        } catch (error) {
            console.log(error);

            console.error("Erro ao conectar ao banco de dados.");
        }
    }
}

export default new AppPrecification().app