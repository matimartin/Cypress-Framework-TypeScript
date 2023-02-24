import moment from 'moment';
import { dataManipulationUtility } from '@helpers/utilities/dataManipulationUtility';
import { ExcelInputDataEntity } from '@dto/excelInputDataEntity';
import *  as excelData from '@fixtures/excelData.json'
import { deserializeArray } from 'class-transformer';

class ExcelUtility {

    /**
     * Description: Generate excel for given input data array
     * @param filePath 
     * @param excelInputData 
     * @param sheetName 
     */
    public generateInputDataExcel(filePath: string, excelInputData: any[], sheetName: string) {
        cy.log(JSON.stringify(excelInputData))
        const XLSX = require('xlsx');
        const ws = XLSX.utils.json_to_sheet(excelInputData, { skipHeader: true });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filePath, { bookType: 'xlsx' });
        cy.log(XLSX.utils.sheet_to_json(wb.Sheets[sheetName]));
    }

    /**
     * Description: Create object data array for `ExcelInputDataEntity` entity
     * @param insertNoOfRecords 
     * @returns 
     */
    public getExcelInputData(insertNoOfRecords:number) :ExcelInputDataEntity[]{
        // here we are creating data array of below dto
        const excelInputDataArray: ExcelInputDataEntity[] = [];
        const excelInputDataHeaders: ExcelInputDataEntity = {
            TenantName: "TENANT NAME",
            TenantCode: "TENNAT CODE",
            OrgName: "ORG NAME",
            SupportNumber: "SUPOORT NUMBER"
        }
        excelInputDataArray.push(excelInputDataHeaders);
        let randomName = dataManipulationUtility.getRandomStringGeneratedWithGiveLength(3);
        for(let index=1;index<=insertNoOfRecords;index++){
            const excelInputDataEntry:ExcelInputDataEntity={
                TenantName: "TenantName"+randomName+index,
                TenantCode: "TenantCode"+randomName+index,
                OrgName: "OrgName"+randomName+index,
                SupportNumber: "123456789"
            }
            excelInputDataArray.push(excelInputDataEntry);
        }
        return excelInputDataArray;
    }

    /**
     * Description: Get recently downloaded file result
     * @param sheetName 
     */
    public getRecentlyDownloadedFileResult(sheetName:string){
        // here we are using download file folder as mentioned in cypress.config.ts file
        cy.waitUntil(()=>
        cy.task('getLastDownloadFilePath')
        . then(result => result),
            {timeout:3000,interval:100})
            .then(filePath=>{
                cy.task('generateJSONFromExcel',{excelFilePath:`${filePath}`,sheetName:`${sheetName}`}).then((resultData)=>{
                    cy.writeFile('cypress/fixtures/response/excelResultData',JSON.stringify(resultData));
                    cy.log(JSON.stringify(resultData));
                })
            })

    }
}

export const excelUtility = new ExcelUtility();