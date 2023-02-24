# CYPRESS-FRAMEWORK

This automation project is using cypress 10.3.1 

### Pre-requisite

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.
- use any IDEs that support node project


### Installation

1. Clone the repo using below URL

```sh
https://github.globant.com/vikas-kumar01/Cypress-Framework.git
```

2. Navigate to folder and install npm packages using:

```sh
npm install / npm install --force
```

### About project

1. For Cypress Configuration file used is `cypress.config.ts`.
2. For executiing tests on different environment , update cypress.env.json file
3. Consider using given environment for respective spec files.
  * apiMocking.cy.ts -  'QA' 
  * apiUiValidation.cy.ts - 'PREPROD'
  * sorting.cy.ts - 'PROD'
  * visualTest.cy.ts - 'DEV'
  * azureADLogin.cy.ts - This spec have code for microsoft authentication , It is not working as we don't have credentials to login
  * excelManipulation.cy.ts - This spec have code excel download /upload functionality , but we need demo website to execute it.


## Execute Test Cases 

### Running E2E tests in headedless mode

Run `npm run cy:run`

### Running E2E tests in headed mode

Run `npm run cy:run --headed`

### Running single spec in headedless mode

Run `npm run cy:run --spec='cypress/e2e/apiMocking.cy.ts'`

### Running single spec in headed mode

Run `npm run cy:run --headed --spec='cypress/e2e/apiMocking.cy.ts'`

### Open cypress dashboard

Run `npm run test`

### Execute test cases with allure-report 

Run `npm run cy:run-allure-report`

### Generate allure-report 

Run `npm run allure-report`

### Compile mochawesome report

Run `npm run compile-mochawsome-report`

### Generate mochawesome report

Run `npm run generate-mochawsome-report`

### Remove all old reports folder

Run `npm run remove-reports`

### Decorate all files with standard rule (.eslintrc.js)

Run `npm run lint-fix`

Note : Refer package.json scripts section for more details

## Framework structure and details

Visit : https://docs.google.com/document/d/1TVxNnwCUt2QrNBbioMDV7F7Hccyrbu5Qg7e25YsISmQ/

























