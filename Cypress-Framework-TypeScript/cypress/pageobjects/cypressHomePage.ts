import { BasePage } from "./basePage";

class CypressHomePage extends BasePage {

    get coursesContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[data-test^='course-']");
    }

    get coursesText(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[data-test^='course-'] p");
    }

    get learnings(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.relative > dt > p');
    }

    get lessonProgress(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('a[data-test^="lesson-progress-link-"]');
    }

}
export const cypressHomePage = new CypressHomePage();