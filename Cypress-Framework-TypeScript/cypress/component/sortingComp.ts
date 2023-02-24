class SortingComp {

    get stateSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(1)');
    }

    get stateNameList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.row .cell:nth-child(1)');
    }

    get confirmedSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(2)');
    }

    get activeSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(3)');
    }

    get recoveredSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(4)');
    }

    get deceasedSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(5)');
    }

    get testeSortLink(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.table-container > div > div:nth-child(1) >div:nth-child(6)');
    }

}
export const sortingComp = new SortingComp();