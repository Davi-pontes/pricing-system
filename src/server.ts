import moment from "moment";
import app from "./app"
import { config } from "dotenv"

config()

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`Servidor iniciado na porta,versão v1.21.2 ${port} em ${moment().toDate()}`)
})