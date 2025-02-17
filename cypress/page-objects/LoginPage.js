class LoginPage {
    visit() {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
    }

    enterEmail(email) {
        cy.get('#email').type(email);
    }

    enterPassword(password) {
        cy.get('#pass').type(password);
    }

    submit() {
        cy.get('button[title="Sign In"]').click();
    }

    verifyLoginSuccess() {
        cy.contains('Welcome').should('be.visible');
    }
}

export default new LoginPage();
