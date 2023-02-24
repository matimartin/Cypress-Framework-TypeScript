import { apiActions } from '@core/apiActions'
import { browserActions } from '@core/browserActions';
import { Book } from '@dto/book';
import * as apiEndpointsData from '@fixtures/data/apiEndpointsData.json'
import { deserializeArray } from 'class-transformer';

describe("API Mocking data validation", () => {
  
  beforeEach(("Visit application"),()=>{
    browserActions.openApp();
  })

  it("Response modification - status code, response body", () => {
    apiActions.mockAPIResponseData(apiEndpointsData.books.methodName, apiEndpointsData.books.endpoint, apiEndpointsData.books.statuCode, apiEndpointsData.books.responseBody, apiEndpointsData.books.alias)
    cy.contains("Book Store Application").click();
    cy.wait(apiEndpointsData.books.aliasName).then((xhr) => {
      const booksResponseFromAPI: Book[] = deserializeArray(Book, JSON.stringify(xhr.response.body.books), { excludeExtraneousValues: true });
      expect(xhr.response.statusCode).to.be.eql(200);
      cy.log(JSON.stringify(booksResponseFromAPI));
    });
    cy.contains("Git Pocket Guide").click();
    cy.url().should('equal',"https://demoqa.com/books?book=9781449325862");
  });

  it("Request modification- add a header to an outgoing request", () => {
    apiActions.mockAPIRequestData(apiEndpointsData.books.methodName, apiEndpointsData.books.endpoint, apiEndpointsData.books.headers, apiEndpointsData.books.alias)
    cy.visit("https://demoqa.com/books/");
    cy.wait(apiEndpointsData.books.aliasName)
      .its('request.headers')
      .should('have.property', 'new-header', 'added by interceptor');
  });

  it("Request modification-modify an existing header", () => {
    apiActions.mockAPIRequestData(apiEndpointsData.books.methodName, apiEndpointsData.books.endpoint, apiEndpointsData.books.existingHeaders, apiEndpointsData.books.alias)
    cy.visit("https://demoqa.com/books/");
    cy.wait(apiEndpointsData.books.aliasName)
      .its('request.headers')
      .should('have.property', 'sec-ch-ua-mobile', 'interceptor-change');
  });

  it("Request modification-modify the request body before it's sent to its destination", () => {
    // modify the request body before it's sent to its destination
       
  });
});