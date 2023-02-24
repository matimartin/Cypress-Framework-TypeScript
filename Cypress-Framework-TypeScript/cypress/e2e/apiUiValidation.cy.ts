import { apiActions } from '@core/apiActions'
import { browserActions } from '@core/browserActions';
import { CypressCourse } from '@dto/cypressCourse';
import * as apiEndpointsData from '@fixtures/data/apiEndpointsData.json'
import { cypressHomePageHelpers } from '@helpers/cypressHomePageHelpers';

describe("API UI data validation", () => {
  
  beforeEach(() => {
    apiActions.aliasEndpoints(apiEndpointsData.cypressCourses.methodName, apiEndpointsData.cypressCourses.endpoint, apiEndpointsData.cypressCourses.aliasName);
    browserActions.openApp();
    cy.viewport(1980, 1024);
  });
  
  it("Validate API vs UI data", () => {
    const allCoursesFromUI: CypressCourse[] = cypressHomePageHelpers.getAllCoursesDataFromUI();
    apiActions.verifyCoursesUiDataWithApiData(apiEndpointsData.cypressCourses.alias, allCoursesFromUI);
  });
  
});
  