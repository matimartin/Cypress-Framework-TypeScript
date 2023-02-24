import { elementActions } from "./elementActions";

class ElementChecks {

public checkElementDisplayed(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.be.visible');
  
    return selector.should('be.visible');
}

public checkElementExist(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.exist');

    return selector.should('exist');
}

public checkElementChecked(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.be.checked');

    return selector.should('be.checked');
}

public checkElementEnabled(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.be.enabled');

    return selector.should('not.be.disabled');
}

public checkListOfElementsEnabled(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean){
   selector.each((ele)=>{
    if (falseCase)
      return cy.wrap(ele).should('not.be.enabled');
    else
      return cy.wrap(ele).should('not.be.disabled');
   });
}

public checkElementDisabled(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('have.class','diasble-input');

    return selector.should('not.have.class','diasble-input');
}

public checkElementEnabledWithDisabledClass(selector: Cypress.Chainable<JQuery<HTMLElement>>, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('have.class','diasbled');

    return selector.should('not.have.class','diasbled');
}

public checkElementTextEquality(selector: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.have.text',actualText);

    return selector.should('have.text',actualText);
}

public checkElementTextContains(selector: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.should('not.contain.text',actualText);

    return selector.should('contain.text',actualText);
}

public checkElementTextContainsInsensitive(selector: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    const reg = new RegExp(`${actualText}`,'gi');
    if (falseCase)
      return selector.should('not.match',reg);

    return selector.should('match',reg);
}

public checkElementTextStartsWith(selector: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string, falseCase?: boolean){
    selector.invoke('text').then($text=>{
     if (falseCase)
       expect($text.startsWith(actualText)).not.to.eq(true);
     else
       expect($text.startsWith(actualText)).to.eq(true);
    });
 }

 public checkListOgDropDownValues(selector: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string, falseCase?: boolean){
    if (falseCase)
       return selector.find('option').each(($ele, index)=>{
        cy.wrap($ele).invoke('text').should('not.equal',actualText[index]);
       })
     else
     return selector.find('option').each(($ele, index)=>{
        cy.wrap($ele).invoke('text').then((text)=>{
            expect(text.trim()).to.equal(actualText[index]);
        });
       });   
 }

 public checkElementAttributeEquality(selector: Cypress.Chainable<JQuery<HTMLElement>>,attributeName : string,attributeValue : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
  if (falseCase)
    return selector.should('not.have.attr',attributeName,attributeValue);

  return selector.should('have.attr',attributeName,attributeValue);
}

public checkElementAttributContains(selector: Cypress.Chainable<JQuery<HTMLElement>>,attributeName : string,attributeValue : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
  if (falseCase)
    return selector.should('not.contain.attr',attributeName,attributeValue);

  return selector.should('contain.attr',attributeName,attributeValue);
}

public checkElementCount(selector: Cypress.Chainable<JQuery<HTMLElement>>,count : number,falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
  if (falseCase){
    return selector.should(($selector) => {
      expect($selector).not.to.have.length(count);
    });
  }
 return selector.should(($selector) => {
  expect($selector).to.have.length(count);
});
}

public checkListOfElementTextContains(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string,falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
  const reg = new RegExp(`${actualText}`,'gi');
  if (falseCase){
    return selectorList.each(($element) => {
      cy.wrap($element).invoke('text').should('not.match',reg);
    });
  }
  return selectorList.each(($element) => {
    cy.wrap($element).invoke('text').should('match',reg);
  });
}

public checkListOfElementTextContainsInsensitive(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string): Cypress.Chainable<JQuery<HTMLElement>>{
 return selectorList.each((element: JQuery<HTMLElement>) => {
      cy.wrap(element).should('contain', actualText ,{matchCase : false });
    });
  }

  public checkSelectedValueForDropdown(selector: Cypress.Chainable<JQuery<HTMLElement>>,value : string, falseCase?: boolean): Cypress.Chainable<JQuery<HTMLElement>>{
    if (falseCase)
      return selector.find('option:selected').should('not.have.text',value);
  
    return selector.find('option:selected').should('have.text',value);
  }

  public checkElementAttributeValue(selector: Cypress.Chainable<JQuery<HTMLElement>>,attributeName : string, expectedValue: string){
    selector.invoke('attr',attributeName).should('equal',expectedValue);
  }

  public checkElementIsExists(selector: Cypress.Chainable<JQuery<HTMLElement>>): boolean{
  let value=false;
  selector.should('to.exist').then(() => {
    value=true;
  });
  return value;
  }

  public checkArraysEquality(actualArray: any[],expectedArray: any[]){
    expect(expectedArray).to.deep.equal(actualArray);
  }

  public checkElementOrderMatchLabelText(selector: Cypress.Chainable<JQuery<HTMLElement>>,order: number,labelText: string | string[]){
     selector.eq(order).should('contain',labelText);
  }

  public checkElementValueEquality(selector: Cypress.Chainable<JQuery<HTMLElement>>,elementValue : string, falseCase?: boolean){
     if (falseCase)
       selector.should('not.have.value',elementValue);
     else
      selector.should('have.value',elementValue);
 }

  public checkEachListElementTextWithGivenArray(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string[]){
  selectorList.each((ele,index) => {
   cy.wrap(ele).should('have.text',actualText[index]);
  });
 }

 public checkEachListElementTextContainsGivenArray(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,actualText : string[]){
  selectorList.each((ele,index) => {
   cy.wrap(ele).should('contains',actualText[index]);
  });
 }

 //need to check
 public checkEachListElemenIsEnabled(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,flag: boolean,count?: number){
  selectorList.each((ele,index) => {
    if(count){
      if(index < count)
        this.checkElementEnabled(cy.wrap(ele).scrollIntoView(),!flag);
    }
    else
    this.checkElementEnabled(cy.wrap(ele).scrollIntoView(),!flag);
  });
 }

  //need to check
 public checkEachListElemenIsDisplayed(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,flag: boolean,count?: number){
  selectorList.each((ele,index) => {
    if(count){
      if(index < count)
        this.checkElementDisplayed(cy.wrap(ele).scrollIntoView(),!flag);
    }
    else
    this.checkElementDisplayed(cy.wrap(ele).scrollIntoView(),!flag);
  });
 }

 public checkEachListElementAttributeValue(selectorList: Cypress.Chainable<JQuery<HTMLElement>>,attributeName : string,expectedValue : string){
  selectorList.each((ele,index) => {
   cy.wrap(ele).invoke('attr',attributeName).should('equal',expectedValue);
  });
 }

 public checkElementCssEquality(selector: Cypress.Chainable<JQuery<HTMLElement>>,cssAttr : string,cssValue : string, flag?: boolean) : void{
  if (flag)
    selector.should('not.have.css',cssAttr,cssValue);
  else
   selector.should('have.css',cssAttr,cssValue);
}

public verifyElementValueIsEmpty(selector: Cypress.Chainable<JQuery<HTMLElement>>,flag?: boolean) : void{
  if (flag)
    selector.invoke('val').should('be.empty');
  else
   selector.invoke('val').should('not.be.empty');
}

public verifyElementTextIsEmpty(selector: Cypress.Chainable<JQuery<HTMLElement>>,flag?: boolean) : void{
  if (flag)
    selector.invoke('text').should('be.empty');
  else
   selector.invoke('text').should('not.be.empty');
}

 public verifyTextWithGivenAlias (selector: Cypress.Chainable<JQuery<HTMLElement>>,aliasName : string,isNotEqual?: boolean): void{
   elementActions.getAliasCreatedFor(aliasName).then((expText) => {
    this.checkElementTextEquality(selector,expText + '',isNotEqual);
   });
 }


 }
 export const elementChecks =new ElementChecks();










