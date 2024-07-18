import moment from "moment";

export class GetDateAndHoursCurrent{
    
    static dateTime(){
        return moment().format('YYYY-MM-DD HH:mm:ss')
    }
}