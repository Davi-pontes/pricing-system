import xlsx from 'xlsx'

export class XLSXService {
    readExcelFile() {
        try {
            const path = './src/common'
            const filePath = 'Planilha-farmacia-teste.xlsx'

            const file = xlsx.readFile(`${path}/${filePath}`)

            const sheets = file.SheetNames

            const dataFormated = this.formatedData(sheets, file)

        } catch (error) {
            console.log(error);

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

const service = new XLSXService()

service.readExcelFile()