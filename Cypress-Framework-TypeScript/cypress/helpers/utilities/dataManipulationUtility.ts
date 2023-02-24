class DataManipulationUtility {

    public getBooleanDataForYesNoString(yesNOString: string){
        return yesNOString === 'Yes' ? true : false;
    }

    public getBooleanDataForTrueFalseString(trueFalseString: string){
        return trueFalseString.toLowerCase() === 'true' ? true : false;
    }
 
    public getNullValueForNAValue (value: string){
        return value === 'N/A' ? null : value;
    }

    public getEmptyStringForNAValue (value: string){
        return value === 'N/A' || value === 'N/A' ? '' : value;
    }

    public getNullValueForEmptyString (value: string){
        return value === '' || value === null ? '' : value;
    }

    public getRandomStringGeneratedWithGiveLength(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength =characters.length;
        for (let i=0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public getRandomValueFromGivenArrayNumber(dataArray:number[]): number {
        return dataArray[Math.floor(Math.random() * dataArray.length)]
    }

    public getRandomValuesFromGivenArrayNumber(dataArray:string[]): string[] {
        const shuffled = dataArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0,this.generateRandomInteger(1, dataArray.length));
    }

    public getStringConvertedToBoolean(data:string):boolean{
        if (data.toUpperCase() === 'TRUE')
            return true;
        else if (data.toUpperCase() === 'FALSE')
            return false;

        return false;
    }

    public generateRandomInteger(min:number,max:number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  
}
export const dataManipulationUtility = new DataManipulationUtility();