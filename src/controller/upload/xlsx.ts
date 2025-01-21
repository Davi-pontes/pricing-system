import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MulterFile } from "@/interfaces/multer";
import { UploadXLSXService } from "@/service/upload/xlsx";

export class UploadController implements IController{
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
       try {
        const file = httpRequest.file as MulterFile

        const uploadXLSXService = new UploadXLSXService()

        const upload = uploadXLSXService.handleUploadExcelFile(file)
        
        return ok<any>('Success')
       } catch (error) {
        return serverError()
       }
    }

}