export class ExcelManipulationPage {

    get excelUploadFileLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("add upload file");
    }
}
export const excelManipulationPage = new ExcelManipulationPage();