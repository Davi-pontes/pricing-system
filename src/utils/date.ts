import moment from "moment";

export class Date {
    static formatToYearMonthDay(date: Date): string {
        return moment(date).format('YYYY-MM-DD')
    }
}