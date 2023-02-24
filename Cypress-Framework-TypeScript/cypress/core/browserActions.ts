import * as baseUrl from "@fixtures/baseUrl.json"
class BrowserActions {

    /**
     * Description: Save local storage
     */
    public saveLocalStorage(): void {
        cy.login(baseUrl['default'][Cypress.env('environment')])
    }

    /**
     * Description: Restore local storage
     */
    public restoreLocalStorage(): void {
        cy.restoreLocalStorage();
    }

    /**
     * Description: Open Application
     */
    public openApp(): void {
        cy.visit(baseUrl['default'][Cypress.env('environment')]);
    }

}
export const browserActions=new BrowserActions();