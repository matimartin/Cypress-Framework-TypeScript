import { elementActions } from "@core/elementActions";
import { CypressCourse } from "@dto/cypressCourse";
import { cypressHomePage } from "@pageobjects/cypressHomePage";

class CypressHomePageHelpers {

    public getAllCoursesDataFromUI() : CypressCourse[] {
        const allCoursesFromUI: CypressCourse[] = [];
        cypressHomePage.coursesContainer.each((course, index) => {
            elementActions.clickElement(cy.wrap(course));
            elementActions.getElementText(cypressHomePage.coursesText.eq(index)).then(titleText => {
                const title: string = titleText;

                const learnings: string[] = [];
                cypressHomePage.learnings.each(learning => {
                    const tempLearning = learning.text();
                    learnings.push(tempLearning);
                })

                const lessonProgress: string[] = [];
                cypressHomePage.lessonProgress.each(lesson => {
                    const tempLesson = lesson.text();
                    lessonProgress.push(tempLesson);
                })

                const UiCourse: CypressCourse = {
                    title : title,
                    learnFeatures : learnings,
                    lessons : lessonProgress
                }

                allCoursesFromUI.push(UiCourse);
            })
        })
        
        cy.writeFile('cypress/fixtures/response/coursesFromUI.json', allCoursesFromUI);
        return allCoursesFromUI;
    }
  
}
export const cypressHomePageHelpers = new CypressHomePageHelpers();