
import {browserActions } from "@core/browserActions";

describe('Azure AD login flow', () => {

  before("Get local storage values before all test case execution",() => {
    browserActions.saveLocalStorage();
  })

  beforeEach("Save local storage values and open app before each test case execution",() => {
    browserActions.restoreLocalStorage();
    browserActions.openApp();
  })

  it('Start your first test case', () => {
    /**
        * write your script here
        */
  });
})