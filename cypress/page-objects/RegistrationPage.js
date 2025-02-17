class RegistrationPage {
    visit() {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
    }

    enterFirstName(firstName) {
        cy.get('#firstname').type(firstName);
    }

    enterLastName(lastName) {
        cy.get('#lastname').type(lastName);
    }

    enterEmail(email) {
        cy.get('#email_address').type(email);
    }

    enterPassword(password) {
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
    }

    submit() {
        cy.get('button[title="Create an Account"]').click();
    }

    verifyRegistrationSuccess() {
        cy.contains('Thank you for registering').should('be.visible');
    }
}

export default new RegistrationPage();
