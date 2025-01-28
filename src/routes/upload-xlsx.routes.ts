import { Router } from "express";
import { uploadXlsx } from "@/config/multerConfig";
import { UploadController } from "@/controller/upload/xlsx";
import { AuthMidlleware } from "@/middleware/auth";

const routes = Router();

const authMidlleware = new AuthMidlleware()

routes.use(authMidlleware.validateToken)

routes.post('/xlsx', uploadXlsx.single('excel'), async (req,res) => {
    const uploadController = new UploadController()

    const {body,statusCode} = await uploadController.handle({
        file: req.file
    })
    res.status(statusCode).send(body)
})

export { routes as UploadXlsx }