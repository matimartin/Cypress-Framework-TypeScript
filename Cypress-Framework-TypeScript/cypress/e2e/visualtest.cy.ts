///<reference types="cypress"/>
import { browserActions } from '@core/browserActions';

describe('Demo Visual Testing',()=>{

  beforeEach(()=>{
    browserActions.openApp();
  });
  
  it('verify all UI HTML component',{tags:['smoke']},()=>{
    cy.matchImageSnapshot('todoMVC');
  });

  it('verify element',()=>{
    cy.get('#root').matchImageSnapshot('todoHeader');
  });

  it('blackout element',()=>{
    cy.matchImageSnapshot('elementBlackout',{blackout:['input.new-todo']});
  });

  it('verify threshold component',()=>{
    cy.matchImageSnapshot('todoTaskPageNew',{failureThreshold:20,failureThresholdType:"percent",updatePassedSnapshot:true});
  });

  it('clip image',()=>{
    cy.matchImageSnapshot('clipImage',{clip:{x:20,y:30,width:300,height:200}});
  });

})
