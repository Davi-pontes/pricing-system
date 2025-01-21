import { MulterFile } from '@/interfaces/multer';
import xlsx from 'xlsx'

export class UploadXLSXService {
    handleUploadExcelFile(fileParams: MulterFile) {
        try {
            if(!fileParams) throw new Error('Could not load file.')
            
            const path = fileParams.path

            const file = xlsx.readFile(path)

            const sheets = file.SheetNames

            const dataFormated = this.formatedData(sheets, file)
            
            console.log(dataFormated);
        } catch (error) {
            throw new Error('Could not load file.')
        }
    }
    private formatedData(sheets: any, file: any): any {
        let data = Array()
        for (let i = 0; i < sheets.length; i++) {

            const temp = xlsx.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        return data
    }
}
// const service = new UploadXLSXService()

// service.readExcelFile()