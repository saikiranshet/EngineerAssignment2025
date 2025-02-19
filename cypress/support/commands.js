
import 'cypress-xpath';
import '@shelex/cypress-allure-plugin';

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/customer/account/login');
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.wait(5000); // Waits for 5000 milliseconds (5 seconds)
    cy.get('#send2').click();
    
  });
  