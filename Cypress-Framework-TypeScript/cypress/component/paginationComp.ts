class PaginationComp {

    get topPageSizeListDropDown(): Cypress.Chainable<JQuery<HTMLElement>> {
       return cy.get('#pageSizeId_DropDown_Upper, #pageSizeIdUpper');
    }

    get topPaginationEnableNextButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#pageSizeId_DropDown_Upper, #pageSizeIdUpper');
     }
}
export const paginationComp = new PaginationComp();