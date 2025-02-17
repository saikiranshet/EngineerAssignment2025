import ProductPage from '../../page-objects/ProductPage';
import CartPage from '../../page-objects/CartPage';
import testData from '../../fixtures/testData.json';
import uniqueEmail from '../../fixtures/uniqueEmail.json';

describe('Order Flow with Multiple Products', () => {
    before(() => {
      // Ensure that the user is logged in before placing an order
      cy.wait(5000); // Waits for 5000 milliseconds (5 seconds)
      cy.login(uniqueEmail.email, testData.password); // Use email and password from your testData file
    });

    it('should add products to cart and place an order', () => {
        // Add first product to the cart
        cy.visit('/men.html'); // Visit the category page for men products
        cy.get('.product-item').first().click(); // Click on the first product
        cy.get('button[title="Add to Cart"]').click(); // Add to cart
        
        // Verify that the product is added to the cart
        cy.get('.cart-icon').should('contain', '1 item'); // Check cart icon to ensure one item is added
        
        // Add second product to the cart
        cy.visit('/women.html'); // Visit the category page for women products
        cy.get('.product-item').eq(1).click(); // Click on the second product
        cy.get('button[title="Add to Cart"]').click(); // Add to cart
        
        // Verify that the second product is added to the cart
        cy.get('.cart-icon').should('contain', '2 items'); // Check cart icon to ensure two items are added

        // Go to the cart and proceed to checkout
        cy.visit('/checkout/cart/');
        cy.contains('Proceed to Checkout').click();

        // Fill in shipping details (select shipping method)
        cy.get('#shipping-method').click(); // Choose a shipping method (simplified)
        
        // Fill in payment details (select payment method)
        cy.get('#payment-method').click(); // Choose a payment method (simplified)

        // Place order
        cy.contains('Place Order').click();

        // Verify order confirmation
        cy.contains('Thank you for your purchase!').should('be.visible'); // Verify successful order confirmation
    });
});
