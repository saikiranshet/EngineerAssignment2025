/// <reference types="cypress" />

import LoginPage from "../../page-objects/LoginPage";
import CartPage from "../../page-objects/CartPage";
import CheckoutPage from "../../page-objects/checkoutpage";
import uniqueEmail from "../../fixtures/uniqueEmail.json";
import testData from "../../fixtures/testData.json";
import ProductPage from "../../page-objects/ProductPage";
import searchPage from "../../page-objects/searchPage";
// import WishlistPage from "../../page-objects/WishlistPage";
import WishlistPage from "../../page-objects/WishlistPage";
import 'cypress-xpath';


describe("Wishlist Checkout Test", () => {
    before(() => {
        cy.login(uniqueEmail.email, testData.password);
        cy.xpath('/html/body/div[2]/header/div[2]/a/img').click();
        
    });

    it("Add product to wishlist and checkout", () => {

        ProductPage.searchForProduct(testData.productName);
        WishlistPage.moveToCart();
        CartPage.proceedToCheckout();

        CheckoutPage.fillShippingDetails();
        CheckoutPage.placeOrder();
    });
});
