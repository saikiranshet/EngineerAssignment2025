// import RegistrationPage from "../support/pageObjects/RegistrationPage";
// import LoginPage from "../support/pageObjects/LoginPage";
// import testData from "../fixtures/testData.json";
import RegistrationPage from "../../page-objects/RegistrationPage";
import LoginPage from "../../page-objects/LoginPage";
import testData from "../../fixtures/testData.json";
import 'cypress-xpath';


import ProductPage from '../../page-objects/ProductPage';
import CartPage from '../../page-objects/CartPage';

describe('User Registration and Login Test', () => {

    const uniqueEmail = `testuser${Date.now()}@test.com`; // Generate unique email

    it('should register a new user successfully', () => {
        RegistrationPage.visit();
        RegistrationPage.enterFirstName(testData.firstName);
        RegistrationPage.enterLastName(testData.lastName);
        RegistrationPage.enterEmail(uniqueEmail);
        RegistrationPage.enterPassword(testData.password);
        RegistrationPage.submit();
        cy.url().should('include', '/customer/account/');
        cy.contains('Thank you for registering').should('be.visible');
        cy.writeFile('cypress/fixtures/uniqueEmail.json', { email: uniqueEmail });
    });

    it('should log in with registered credentials', () => {
        LoginPage.visit();
        
        cy.get('form', { timeout: 15000 }).should('be.visible');
    
        LoginPage.enterEmail(uniqueEmail);
        LoginPage.enterPassword(testData.password);
        cy.xpath('//*[@id="send2"]/span').click();
        cy.url().should('include', '/customer/account/');
        cy.contains('Welcome').should('be.visible');
    });
    
});


