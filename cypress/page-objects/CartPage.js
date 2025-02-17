class CartPage {
    visit() {
      cy.visit('https://magento.softwaretestingboard.com/checkout/cart/');
    }
  
    verifyCartItemCount(expectedCount) {
      cy.get('.cart-item').should('have.length', expectedCount);
    }
  
    verifyCartTotal(expectedTotal) {
      cy.get('.cart-totals').within(() => {
        cy.get('.price').first().invoke('text').should('contain', expectedTotal); // Check total price
      });
    }
  
    applyCoupon(code) {
      cy.get('#coupon_code').type(code); // Enter coupon code if applicable
      cy.get('button[title="Apply Discount"]').click(); // Apply discount
    }
  }
  
  export default new CartPage();
  