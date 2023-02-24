import { BasePage } from "./basePage";
export class CovidPage extends BasePage {

    get listOfState(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[data-test^='course-']");
    }

    get listOfConfirmed(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[data-test^='course-']");
    }
}
export const covidPage = new CovidPage();