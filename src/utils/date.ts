import moment from "moment";

export class CustomDateUtils  {
    static formatToYearMonthDay(date: string): string {
        return moment(date).format('YYYY-MM-DD')
    }
    static formatToTableFrontEnd(date: string): string {
        return moment(date , 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')
    }
}