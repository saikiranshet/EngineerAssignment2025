class CartPage {
  visit() {
      cy.visit("/checkout/cart/");
  }

  proceedToCheckout() {
    cy.wait(2000); // Waits for 5000 milliseconds (5 seconds)
    cy.xpath('/html/body/div[2]/header/div[2]/div[1]/a').click();
    cy.wait(3000); // Waits for 5000 milliseconds (5 seconds)
    cy.xpath('//*[@id="top-cart-btn-checkout"]').click();
    cy.wait(3000); // Waits for 5000 milliseconds (5 seconds)
  }
}

export default new CartPage();
