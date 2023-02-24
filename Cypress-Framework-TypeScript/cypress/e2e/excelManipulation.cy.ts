import {elementActions } from "@core/elementActions";
import { excelUtility } from '@helpers/utilities/excelUtility';
import *  as excelData from '@fixtures/excelData.json'
import {excelManipulationPage} from '@pageobjects/excelManipulationPage'

describe('Excel Manipulation Test cases', () => {

  it('Excel upload functionality sample test case', () => {
    // below is sample code for generating excel , you can modify parameters as per need
    excelUtility.generateInputDataExcel(excelData.filePath,excelUtility.getExcelInputData(5),"Sheet1");
    // below is sample code for upload file
    elementActions.uploadFile(excelManipulationPage.excelUploadFileLink,excelData.uploadFilePath);
  });

  it('Get recently downloaded sample test case', () => {
    // below is sample code for getting recently downloaded file
    excelUtility.getRecentlyDownloadedFileResult("Sheet1");
  });
})