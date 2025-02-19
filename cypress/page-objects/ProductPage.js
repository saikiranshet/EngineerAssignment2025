import 'cypress-xpath';

class ProductPage {
    visit(productId) {
      cy.visit(`https://magento.softwaretestingboard.com/${productId}`);
    }
  
    addProductToCart() {
      cy.get('button[title="Add to Cart"]').click(); // Add product to cart
      cy.get('.message-success').should('contain', 'You added');
    }

    elements = {
      searchInput: () => cy.get('#search'),  // Search bar
      searchButton: () => cy.get('.action.search'),  // Search icon
      // searchResults: () => cy.get('.products-grid .product-item'),  // Search results
      // noResultsMessage: () => cy.get('.message.notice'), // No results message
      // firstProduct: () => cy.get('.products-grid .product-item').first(), // First product
      // productTitle: () => cy.get('.page-title span') // Product title in product page
  };

  searchForProduct(productName) {
      cy.wait(2000)
      cy.get('#search')
      this.elements.searchInput().clear().type(productName);
      this.elements.searchButton().click();
      cy.visit('https://magento.softwaretestingboard.com/catalogsearch/result/?q=+Driven+Backpack');
      cy.wait(2000); 
      cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div[2]/ol/li[1]/div/a/span/span/img').click();
  }

  searchProduct(productName) {
    cy.get("#search").type(`${productName}{enter}`);
    cy.contains(productName).click();
}

addToWishlist() {
    cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div[2]/ol/li[1]/div/a/span/span/img').click();
    cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]/span').click();
}
}
  export default new ProductPage();