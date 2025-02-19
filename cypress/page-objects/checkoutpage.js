class CheckoutPage {
    fillShippingDetails() {
        cy.get("#shipping").should("be.visible");
        cy.get('[name="street[0]"]').type("123 Test Street");

        cy.get('select[name="region_id"]').should('be.visible').then(($dropdown) => {
            if ($dropdown.length) {
                cy.wrap($dropdown).select('California'); // If found, select California
            } else {
                cy.log('Dropdown not found');
            }
        });
        cy.get('[name="city"]').type("Test City");
        cy.get('[name="postcode"]').type("12345");
        cy.get('[name="telephone"]').type("1234567890");
    }

    placeOrder() {
        cy.wait(3000); // Waits for 5000 milliseconds (5 secon
        cy.xpath('//*[@id="checkout-shipping-method-load"]/table/tbody/tr/td[1]/input').eq(0).click();
        cy.wait(3000); // Waits for 5000 milliseconds (5 secon
        cy.xpath('//*[@id="checkout-shipping-method-load"]/table/tbody/tr/td[1]/input').eq(1).click();
        cy.wait(1000)
        cy.xpath('//*[@id="shipping-method-buttons-container"]/div/button/span').click();
        cy.wait(4000); // Waits for 5000 milliseconds (5 secon
        cy.xpath('//*[@id="checkout-payment-method-load"]/div/div/div[2]/div[2]/div[4]/div/button').click();
    }
}

export default new CheckoutPage();
