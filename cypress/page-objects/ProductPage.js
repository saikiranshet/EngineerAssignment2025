class ProductPage {
    visit(productId) {
      cy.visit(`https://magento.softwaretestingboard.com/${productId}`);
    }
  
    addProductToCart() {
      cy.get('button[title="Add to Cart"]').click(); // Add product to cart
      cy.get('.message-success').should('contain', 'You added');
    }
  }
  
  export default new ProductPage();