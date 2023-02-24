import { elementActions } from '@core/elementActions';
import { CovidUIEntity } from '@dto/CovidUIEntity';
import * as sortingData from '@fixtures/data/sortingData.json';
import { covidPage } from '@pageobjects/covidPage';
import { paginationComp } from 'cypress/component/paginationComp';
import { sortingComp } from 'cypress/component/sortingComp';

class SortingPageHelpers {

    public sortTableByGivenColumnAndOrder(columnName: string, columnSelector: string, order: string)
    {
      //elementActions.selectOptionByValue(paginationComp.topPageSizeListDropDown, sortingData.RecordsPerPageDropdownOptions[3].toString());
      if(order === sortingData.sortInOrder[1])
       elementActions.clickElement(sortingComp[columnSelector]);
       else{
        elementActions.clickElement(sortingComp[columnSelector]);
        elementActions.clickElement(sortingComp[columnSelector]);
       }
    }

    public verifyTableColumnSorted(tableKey: string, columnType: string, columnKey: string, sortingOrder: string): void {
     switch(tableKey)
     {
         case 'covid':
             this.verifyCovidPageAreSorted(columnType, columnKey, sortingOrder);
             break;
     }
    }

    public verifyCovidPageAreSorted(columnType: string, columnKey: string, sortingOder: string)
    {
       const covidListFromUI : CovidUIEntity[] = [];
       this.checkElementDisplayed(paginationComp.topPaginationEnableNextButton);
       paginationComp.topPaginationEnableNextButton.prev().then(($eleLastPage) =>
       {
           const pageNo = parseInt($eleLastPage.find('span:nth-child(2)').text(),10);
           for(let i=0; i<pageNo; i++)
           {
               covidPage.listOfState.each(($state: JQuery<HTMLElement>,index: number) =>{
                   const stateText: string = $state.text();
                   covidPage.listOfConfirmed.eq(index).then(($confirmed) =>
                   {
                    const confirmedText: string = $confirmed.text();
                    const covid: CovidUIEntity ={
                        state: stateText,
                        confirmed:confirmedText
                    };
                    covidListFromUI.push(covid);
                   })
               })
               if(pageNo != 1)
                  elementActions.clickElement(paginationComp.topPaginationEnableNextButton)
           }

       }).then(() =>{
        const sortCovidListFromUI: CovidUIEntity[] = [...covidListFromUI];
        this.sortObjectArray(sortCovidListFromUI,columnKey,columnType,sortingOder);
        this.checkArrayEquality(covidListFromUI,sortCovidListFromUI);
       })
    }

    public sortObjectArray(ObjectArray: any, columnKey: string, columnType: string, sortingOder: string)
    {
        switch(columnType) {
            case 'string':
                ObjectArray.sort((object1, object2) =>
                {
                    return this.getNamesSorted(object1[columnKey],object2[columnKey],sortingOder)
                });
                break;

                case 'number':
                ObjectArray.sort((object1, object2) =>
                {
                    return sortingOder === 'ascending' ? object1[columnKey] - object2[columnKey] : object2[columnKey] - object1[columnKey]
                });
                break;
        }
    }

    private getNamesSorted(name1: string, name2: string, sortingOrder: string) : number{
      name1 = name1.toUpperCase().trim();
      name2 = name2.toUpperCase().trim();
      let result;
      if(sortingOrder === 'ascending')
      result = name1.localeCompare(name2, undefined, {numeric: true});
      else
      result = name2.localeCompare(name1, undefined, {numeric: true});

      return result;
    }

    public checkElementDisplayed(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?:boolean): Cypress.Chainable<JQuery<HTMLElement>> {
        if(falseCase)
        return selector.should('not.be.visible');

        return selector.should('be.visible');
    }

    public checkArrayEquality(actualArray: any[], expectedArray: any[]){
        expect(actualArray).to.deep.equal(expectedArray);
    }
 
}
export const sortingPageHelpers = new SortingPageHelpers()