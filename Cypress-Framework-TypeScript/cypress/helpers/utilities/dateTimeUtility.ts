 import moment from 'moment';
 
 class DateTimeUtility {

    public formatStringDateToAPIDateFormat(dateString: string): string {
        return moment(dateString).format('YYYY-MM-DDThh:mm:ss');
    }
 }

 export const dateTimeUtility = new DateTimeUtility();