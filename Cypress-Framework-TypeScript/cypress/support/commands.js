import 'cypress-file-upload';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { login } from "./authFlow";
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

import "cypress-wait-until";
let cachedTokenExpiryTime = new Date().getTime();
let cachedTokenResponse = null;
let chainable=null;

Cypress.Commands.add("login", (appUrl) => {
  // Clear our cache if tokens are expired
  if (cachedTokenExpiryTime <= new Date().getTime()) {
    cachedTokenResponse = null;
  }

  return login(cachedTokenResponse,appUrl,chainable).then((tokenResponse) => {
    cachedTokenResponse = tokenResponse;
    // Set expiry time to 50 minutes from now
    cachedTokenExpiryTime = new Date().getTime() + 50 * 60 * 1000;
  });
});

/*
saveLocalStorage command is used to save browser local storage details for next run
*/
let LOCAL_STORAGE_MEMORY={};
Cypress.Commands.add("saveLocalStorage",()=>{
  Object.keys(localStorage).forEach((key)=>{
    LOCAL_STORAGE_MEMORY[key]=localStorage[key];
  })
})

/*
restoreLocalStorage command is used to restore all local storage details for next run
*/
Cypress.Commands.add("restoreLocalStorage",()=>{
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key)=>{
    localStorage.setItem(key,LOCAL_STORAGE_MEMORY[key]);
  })
})

/**
 * Description: custom directory to store base images and difference report for failed visual test
 */
 addMatchImageSnapshotCommand({
  customSnapshotsDir:'cypress/visualTestingSnapshots/baseImage',
  customDiffDir:'cypress/visualTestingSnapshots/differenceReport'
});