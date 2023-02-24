class ElementActions {

    public sendKeys(selector: Cypress.Chainable<JQuery<HTMLElement>>, inputText: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.type(inputText);
    }

    public forceSendKeys(selector: Cypress.Chainable<JQuery<HTMLElement>>, inputText: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.type(inputText);
    }

    public clearField(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.clear();
    }

    public forceClearField(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.clear({ force: true });
    }

    public clearAndType(selector: Cypress.Chainable<JQuery<HTMLElement>>, inputText: string): Cypress.Chainable<JQuery<HTMLElement>> {
        selector.clear();
        return selector.type(inputText);
    }

    public clickElement(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.click();
    }

    public forceClickElement(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.dblclick();
    }

    public doubleClickElement(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.click({ force: true });
    }

    public getElementText(selector: Cypress.Chainable<JQuery<HTMLElement>>) {
        return selector.invoke('text');
    }

    public getElementTextInnerValue(selector: Cypress.Chainable<JQuery<HTMLElement>>) {
        return Cypress._.map(Cypress.$(selector), 'innerText'.toString());
    }

    public getElementValueByAlias(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.invoke('val');
    }

    public getElementValue(selector: Cypress.Chainable<JQuery<HTMLElement>>) {
        return selector.invoke('val');
    }

    public selectOptionByValue(dropDownSelector: Cypress.Chainable<JQuery<HTMLElement>>, selectValue: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return dropDownSelector.select(selectValue);
    }

    public wait(): void {
        cy.wait(3000);
    }

    public mouseHover(selector: Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<JQuery<HTMLElement>> {
        return selector.trigger('mouseHover');
    }

    public getElementTextAlias(selector: Cypress.Chainable<JQuery<HTMLElement>>, name: string): Cypress.Chainable<string> {
        return this.getElementText(selector).as(name);
    }

    public getElementValueAlias(selector: Cypress.Chainable<JQuery<HTMLElement>>, name: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getElementValueByAlias(selector).as(name);
    }

    public getListElementTextAlias(selector: Cypress.Chainable<JQuery<HTMLElement>>, name: string): any {
        const aliasNames = [];
        selector.each(($ele) => {
            cy.wrap($ele).parent()
                .invoke('text')
                .then(text => {
                    aliasNames.push(text.trim());
                });
        }).then(() => {
            const aliases: string = aliasNames.join(',');
            return aliases;
        }).as(name)
    }

    public getAliasCreatedFor(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('@$(name)')
    }

    public selectCheckbox(selector: Cypress.Chainable<JQuery<HTMLElement>>, flag?: boolean): Cypress.Chainable<JQuery<HTMLElement>> {
        return flag ? selector.check({ force: true }) : selector.uncheck();
    }

    public forceSelectCheckbox(selector: Cypress.Chainable<JQuery<HTMLElement>>, flag?: boolean): Cypress.Chainable<JQuery<HTMLElement>> {
        return flag ? selector.check({ force: true }) : selector.uncheck({ force: true });
    }

    public getElementCount(selector: Cypress.Chainable<JQuery<HTMLElement>>) {
        return selector.its('length');
    }

    public uploadFile(selector: Cypress.Chainable<JQuery<HTMLElement>>, path: string) {
        return selector.attachFile({ filePath: path });
    }

    public getListTextOfListElements(selector: Cypress.Chainable<JQuery<HTMLElement>>): string[] {
        const textOfElements: string[] = [];
        selector.each($el => {
            textOfElements.push($el.text().trim());
        });
        return textOfElements;
    }

    public clearAndTypeIfElementHavingValue(selector: Cypress.Chainable<JQuery<HTMLElement>>, enterText: string): void {
        selector.then(ele => {
            if (ele.val().toString().length > 0) {
                cy.wrap(ele).clear().type(enterText);
            }
            else {
                cy.wrap(ele).clear().type(enterText);
            }
        });
    }

    public downloadFile(downloadURL: string, downloadFolder: string, downloadFile: string) {
        // cy.downloadFile(downloadURL, downloadFolder, downloadFile);
    }

}
export const elementActions = new ElementActions();