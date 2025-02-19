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
  let addedProducts = [];
  let cartProducts = [];

  it('should add multiple products to cart and validate price calculation', () => {
      let totalPrice = 0;

      products.forEach((product) => {
          cy.wait(5000); 

          cy.document().then((doc) => {
              if (doc.readyState !== 'complete') {
                  cy.wait(3000); 
              }
          });

          cy.get('body').then(($body) => {
              if ($body.find('#search').length === 0) {
                  cy.reload(); 
                  cy.wait(5000);
              }
          });

          cy.get('#search', { timeout: 40000 })
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

          cy.get('.swatch-attribute.size .swatch-option.selected', { timeout: 10000 })
            .should('exist')
            .and('be.visible');

          cy.get('.swatch-attribute.color .swatch-option.selected', { timeout: 10000 })
            .should('exist')
            .and('be.visible');

          cy.get('.price-wrapper .price', { timeout: 20000 })
            .should('be.visible')
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace('$', '').trim());
                totalPrice += price;
                addedProducts.push({ name: product, price: price });
            });

          cy.get('#product-addtocart-button', { timeout: 20000 })
            .should('be.visible')
            .and('not.be.disabled')
            .as('addToCartButton');

          cy.get('@addToCartButton').click({ force: true });

          cy.wait(5000);
      });

      // ✅ Open the cart and ensure it loads
      cy.wait(4000);
      cy.get('.showcart', { timeout: 20000 }).click();
      cy.wait(4000);

      // ✅ Ensure the cart items are visible before validation
      cy.get('.minicart-items-wrapper .product-item', { timeout: 30000 }).then(($items) => {
          cy.log(`🛒 Items Found in Cart: ${$items.length}`);
          cy.log(`🔍 Expected Items: ${addedProducts.length}`);

          expect($items.length).to.equal(addedProducts.length);

          $items.each((index, item) => {
              const cartProductName = Cypress.$(item).find('.product-item-name a').text().trim();
              const cartPriceText = Cypress.$(item).find('.price').text().trim();
              const cartPrice = parseFloat(cartPriceText.replace(/[^0-9.]/g, ''));

              cy.log(`Cart: ${cartProductName} - Price: $${cartPrice}`);

              cartProducts.push({ name: cartProductName, price: cartPrice });
          });
      });

      cy.then(() => {
          cy.log('✅ Cart Products:', JSON.stringify(cartProducts));

          expect(cartProducts.length).to.equal(addedProducts.length);

          cartProducts.forEach((cartItem) => {
              const matchedProduct = addedProducts.find(p => p.name === cartItem.name);
              expect(matchedProduct).to.not.be.undefined;
              expect(matchedProduct.price).to.equal(cartItem.price);
          });
      });
  });
});
