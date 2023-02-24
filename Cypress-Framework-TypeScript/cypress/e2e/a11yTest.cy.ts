import { browserActions } from '@core/browserActions';

describe('Demo Accesibility Testing',()=>{

  beforeEach(()=>{
    browserActions.openApp();
    cy.injectAxe();
  });
  
  it('should log any accessibility failures',{tags:['smoke']},()=>{
    cy.checkA11y();
  });
  
  it('should log any accessibility failures exculding accessibilty failures on provided element',{tags:['smoke']},()=>{
    cy.checkA11y({ exclude: ['h3.lg\\:mb-24']});
  });
  
  it('should log any accessibility failures only on provided element',{tags:['smoke']},()=>{
    cy.checkA11y('h3.lg\\:mb-24');
  });
  
  it('should log only serious and critical accessibility failures',{tags:['smoke']},()=>{
    cy.checkA11y(null, { includedImpacts: ['crtical', 'serious']});
  });
  
  it('should log only serious and critical accessibility failures of provided element',{tags:['smoke']},()=>{
    cy.checkA11y('h3.lg\\:mb-24', { includedImpacts: ['crtical', 'serious']});
  });
  
  it('should log any accessibility failures excluding provided rules',{tags:['smoke']},()=>{
    cy.checkA11y(null, { rules: {
      'html-has-lang': {enabled: false}
    }});
  });

})
