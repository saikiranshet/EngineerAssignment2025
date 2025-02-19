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

  const products = ["Radiant Tee", "Argus All-Weather Tank"]; // Add more products if needed

  it('should add multiple products to cart and validate price calculation', () => {
      let totalPrice = 0;
      let addedProducts = [];

      products.forEach((product) => {
          // ✅ Fix: Ensure Page Loads Fully Before Searching
          cy.wait(5000); 

          cy.document().then((doc) => {
              if (doc.readyState !== 'complete') {
                  cy.wait(3000); // Wait more if page is still loading
              }
          });

          // ✅ Fix: Ensure Search Box is Available
          cy.get('body').then(($body) => {
              if ($body.find('#search').length === 0) {
                  cy.reload(); // Reload page if search bar is missing
                  cy.wait(5000);
              }
          });

          cy.get('#search', { timeout: 20000 })
            .should('exist')
            .should('be.visible')
            .clear()
            .type(`${product}{enter}`);

          // ✅ Ensure products are loaded before clicking
          cy.get('.product-item', { timeout: 20000 })
            .should('be.visible')
            .first()
            .as('firstProduct');

          cy.get('@firstProduct')
            .find('a.product-item-link')
            .should('exist')
            .click({ force: true });

          // ✅ Ensure product page loads completely
          cy.get('.page-title', { timeout: 20000 }).should('be.visible');

          // ✅ Fix: Wait for size & color options before clicking
          cy.get('body').then(($body) => {
              if ($body.find('.swatch-attribute.size').length > 0) {
                  cy.get('.swatch-attribute.size .swatch-option', { timeout: 10000 })
                      .should('exist')
                      .should('be.visible')
                      .first()
                      .click({ force: true });
              }
          });

          cy.get('body').then(($body) => {
              if ($body.find('.swatch-attribute.color').length > 0) {
                  cy.get('.swatch-attribute.color .swatch-option', { timeout: 10000 })
                      .should('exist')
                      .should('be.visible')
                      .first()
                      .click({ force: true });
              }
          });

          // ✅ Double-check if size and color are selected
          cy.get('.swatch-attribute.size .swatch-option.selected', { timeout: 5000 })
            .should('exist')
            .and('be.visible');

          cy.get('.swatch-attribute.color .swatch-option.selected', { timeout: 5000 })
            .should('exist')
            .and('be.visible');

          // ✅ Ensure price is retrieved after elements load
          cy.get('.price-wrapper .price', { timeout: 20000 })
            .should('be.visible')
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace('$', '').trim());
                totalPrice += price;
                addedProducts.push(product);
            });

          // ✅ Ensure "Add to Cart" button is clickable
          cy.get('#product-addtocart-button', { timeout: 20000 })
            .should('be.visible')
            .and('not.be.disabled')
            .as('addToCartButton');

          cy.get('@addToCartButton').click({ force: true });

          // Wait before adding the next item
          cy.wait(5000);
      });

      // ✅ Open the cart and ensure it loads
      cy.get('.showcart', { timeout: 20000 }).click();
      cy.wait(5000);

      // ✅ Ensure all products are in the cart
      cy.get('.minicart-items-wrapper .product-item', { timeout: 30000 })
        .should(($items) => {
            expect($items.length).to.equal(addedProducts.length);
        });

     // ✅ Retry getting the total price if it's not visible yet
      cy.get('.cart-subtotal .price', { timeout: 25000 })
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace('$', '').trim());
          expect(subtotal).to.equal(totalPrice);
      });
  });
});
