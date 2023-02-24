import { CypressCourse } from "@dto/cypressCourse";
import { deserialize, deserializeArray } from "class-transformer";
import * as apiEndpointsData from '@fixtures/data/apiEndpointsData.json';

class ApiActions {

    public callHttpMethod(methodName: string,endpoint: string,payload:any):void{
        cy.request({
            method: methodName,
            url: endpoint,
            body: payload
        }).then(resp => {
            cy.log(resp.body)
        });
    }

    public callHttpMethodWithoutCheckingFailure(methodName: string,endpoint: string,isFailureRequired:boolean):void{
        cy.request({
            method: methodName,
            url: endpoint,
            failOnStatusCode: isFailureRequired
        }).then(resp => {
            cy.log(resp.body)
        });
    }
 
    public aliasEndpoints(methodName: string,endpoint: string, aliasName: string): Cypress.Chainable<null>{
     return cy.intercept({
         pathname : endpoint,
         method : methodName
     }).as(aliasName);
    }

    public aliasEndpointsWithQueryParams(methodName: string,endpoint: string, aliasName: string,queryObject: any): Cypress.Chainable<null> {
        const queryObj = {};
        queryObject.forEach(element => {
            queryObj[element.name] = element.value;
        });
        return cy.intercept({
            pathname: endpoint,
            method: methodName,
            query: queryObj
        }).as(aliasName);
    }

    public verifyCoursesUiDataWithApiData(alias: string, allCoursesFromUI: CypressCourse[]) {
        cy.wait(alias).then(xhr => {
            expect(xhr.response.statusCode).to.be.eql(200);

            const allCoursesFromAPI: CypressCourse[] = [];

            apiEndpointsData.cypressCourses.allCoursesObject.forEach(course => {
                const coursesFromAPI: CypressCourse = deserialize(CypressCourse, JSON.stringify(xhr.response.body.pageProps.content[course]), { excludeExtraneousValues: true});
                const lessonTitles: string[] = [];
                coursesFromAPI.lessons.forEach(lesson => {
                    lessonTitles.push(lesson['title']);
                })
                const modifiedCoursesFromAPI: CypressCourse = {
                    title : coursesFromAPI.title,
                    learnFeatures : coursesFromAPI.learnFeatures,
                    lessons : lessonTitles
                }
                allCoursesFromAPI.push(modifiedCoursesFromAPI);
            })
            cy.writeFile('cypress/fixtures/response/coursesFromAPI.json', allCoursesFromAPI);

            expect(allCoursesFromAPI).to.deep.equal(allCoursesFromUI);
        })
    }

    public mockAPIResponseData(methodName:string,endpoint:string,statueCode:number,bodydata:Object,alias:string){
        cy.intercept({method: methodName,url:endpoint}, (req) => {
            req.reply({
              statusCode: statueCode, 
              body: bodydata
            })
          }).as(alias);
    }

    public mockAPIRequestData(methodName:string,endpoint:string,headers:any,alias:string,reqBody?:Object){
        cy.intercept({method: methodName,url:endpoint}, (req) => {
            if(reqBody){
           req.body=reqBody
            }
       //    req.headers[`new-entry`]=`added-by-interceptor`
           headers.forEach((entry)=>{
            req.headers[`${entry.name}`]=`${entry.value}`
           })
          }).as(alias);

          
    }

}
export const apiActions = new ApiActions();