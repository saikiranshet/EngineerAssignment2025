class SearchPage {
    elements = {
        searchInput: () => cy.get('#search'),  
        searchButton: () => cy.get('.action.search'), 
        searchResults: () => cy.get('.products-grid .product-item'),  
        noResultsMessage: () => cy.get('.message.notice'), 
        firstProduct: () => cy.get('.products-grid .product-item').first(), 
        productTitle: () => cy.get('.page-title span') 
    };

    searchForProduct(productName) {
        this.elements.searchInput().clear().type(productName);
        this.elements.searchButton().click();
    }

    validateSearchResults(productName) {
        this.elements.searchResults().should('have.length.greaterThan', 0);
    
        // Extract text, trim whitespace, and normalize
        this.elements.searchResults().first()
            .invoke('text')
            .then((text) => {
                const normalizedText = text.trim().replace(/\s+/g, ' ').toLowerCase();
                expect(normalizedText).to.include(productName.toLowerCase());
            });
    }
    

    validateNoResultsMessage() {
        this.elements.noResultsMessage().should('be.visible').and('contain.text', 'Your search returned no results.');
    }
}

export default new SearchPage();
