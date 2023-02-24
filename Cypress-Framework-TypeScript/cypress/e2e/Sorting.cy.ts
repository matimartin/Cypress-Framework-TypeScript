import { browserActions } from '@core/browserActions';
import * as sortingData from '@fixtures/data/sortingData.json';
import { sortingPageHelpers } from '@helpers/sortingHelpers';

describe("API UI data validation", () => {
    before(() => {
      cy.visit('https://www.covid19india.org/');
    });
  
    
      Object.keys(sortingData.sortBy).forEach((tableKey)=>
      {
        const sortingTable = sortingData.sortBy[tableKey];
        sortingTable.column.forEach(columnData => {
          const columnName = columnData.name;
          const columnKey = columnData.key;
          const columnSelector = columnData.selector;
          const columnType = columnData.type;
          it(`Verify ${tableKey} table sorted by ${columnName} in ascending/desending order`, () => {
            sortingData.sortInOrder.forEach(sortingOrder =>{
              sortingPageHelpers.sortTableByGivenColumnAndOrder(columnName,columnSelector,sortingOrder);
              sortingPageHelpers.verifyTableColumnSorted(tableKey,columnType,columnKey,sortingOrder);
            })
        });
      })
    });
  
});
  