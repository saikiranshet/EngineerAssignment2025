
import searchPage from "../../page-objects/searchPage";
import testData from '../../fixtures/testData.json';
import uniqueEmail from '../../fixtures/uniqueEmail.json';
import 'cypress-xpath';

describe('Magento Search Test', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl') || 'https://magento.softwaretestingboard.com');
        cy.login(uniqueEmail.email, testData.password); // Use email and password from your testData file
    });

    it('Should search for a product and validate results', () => {
        cy.xpath('/html/body/div[2]/header/div[2]/a/img').click();
        cy.fixture('testData').then((data) => {
            searchPage.searchFrProduct(data.searchTerm);
            searchPage.validateSearchResults(data.searchTerm);
            const expectedProducts = ['Push It Messenger Bag', 'Voyage Yoga Bag', 'Wayfarer Messenger Bag', 'Joust Duffle Bag']; // Modify as needed
            cy.get('.product-item-link').then(($items) => {
            const actualProducts = [...$items].map((el) => el.innerText.trim());
            expectedProducts.forEach((expectedProduct) => {
            expect(actualProducts).to.include(expectedProduct);
  });
});
        });
    });
});
