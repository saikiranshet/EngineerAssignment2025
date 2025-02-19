import ProductPage from '../../page-objects/ProductPage';
import CartPage from '../../page-objects/CartPage';
import testData from '../../fixtures/testData.json';
import uniqueEmail from '../../fixtures/uniqueEmail.json';

/// <reference types="cypress" />

describe('Place Order with Multiple Products (Price Calculation Checks)', () => {
    
  before(() => {
    cy.login(uniqueEmail.email, testData.password);
    cy.xpath('/html/body/div[2]/header/div[2]/a/img').click(); 
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.get('body').should('be.visible');
  });

  const products = ["Radiant Tee", "Argus All-Weather Tank"];
  let addedProducts = []; // List to store added products
  let cartProducts = [];  // List to store cart products for validation
  let totalPrice = 0;     // Variable to store total price

  it('should add multiple products to cart and validate price calculation', () => {
      products.forEach((product) => {
          cy.wait(3000); // Ensure page load

          // Search for product
          cy.get('#search', { timeout: 20000 })
            .should('exist')
            .should('be.visible')
            .clear()
            .type(`${product}{enter}`);

          cy.get('.product-item', { timeout: 20000 })
            .should('be.visible')
            .first()
            .as('firstProduct');

          cy.get('@firstProduct')
            .find('a.product-item-link')
            .should('exist')
            .click({ force: true });

          cy.get('.page-title', { timeout: 20000 }).should('be.visible');

          // Select size if available
          cy.get('body').then(($body) => {
              if ($body.find('.swatch-attribute.size').length > 0) {
                  cy.get('.swatch-attribute.size .swatch-option', { timeout: 10000 })
                      .should('exist')
                      .should('be.visible')
                      .first()
                      .click({ force: true });
              }
          });

          // Select color if available
          cy.get('body').then(($body) => {
              if ($body.find('.swatch-attribute.color').length > 0) {
                  cy.get('.swatch-attribute.color .swatch-option', { timeout: 10000 })
                      .should('exist')
                      .should('be.visible')
                      .first()
                      .click({ force: true });
              }
          });

          cy.get('.price-wrapper .price', { timeout: 20000 })
            .should('be.visible')
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace(/[^0-9.]/g, '').trim());
                cy.log(`Added: ${product} - Price: $${price}`);
                
                // Store in addedProducts array
                addedProducts.push({ name: product, price });

                totalPrice += price;
            });

          cy.get('#product-addtocart-button', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

          cy.wait(4000);
      });

      // Open Cart
      cy.get('.showcart', { timeout: 20000 }).click();
      cy.wait(4000);

      // Validate products in cart and store them in cartProducts array
      cy.get('.minicart-items-wrapper .product-item', { timeout: 30000 })
        .should('have.length', addedProducts.length)
        .each(($item) => {
            const cartProductName = Cypress.$($item).find('.product-item-name a').text().trim();
            const cartPriceText = Cypress.$($item).find('.price').text().trim();
            const cartPrice = parseFloat(cartPriceText.replace(/[^0-9.]/g, ''));

            cy.log(`Cart: ${cartProductName} - Price: $${cartPrice}`);

            // Store in cartProducts array
            cartProducts.push({ name: cartProductName, price: cartPrice });
        })
        .then(() => {
            // Compare both lists
            expect(cartProducts.length).to.equal(addedProducts.length);

            cartProducts.forEach((cartItem) => {
                const matchedProduct = addedProducts.find(p => p.name === cartItem.name);
                expect(matchedProduct).to.not.be.undefined;
                expect(matchedProduct.price).to.equal(cartItem.price);
            });
        });

      // Validate total price in cart
      cy.get('.minicart-total .price', { timeout: 30000 })
        .invoke('text')
        .then((cartTotalText) => {
            const cartTotal = parseFloat(cartTotalText.replace(/[^0-9.]/g, ''));
            cy.log(`Total Price (Calculated): $${totalPrice}`);
            cy.log(`Total Price (Cart Displayed): $${cartTotal}`);
            
            expect(totalPrice).to.equal(cartTotal);
        });
  });
});
