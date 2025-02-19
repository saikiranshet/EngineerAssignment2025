class WishlistPage {
    visit() {
        cy.visit("/wishlist/");
    }

    moveToCart() {
        cy.wait(2000); // Waits for 5000 milliseconds (5 seconds)
        cy.xpath('//*[@id="maincontent"]/div[2]/div/div[1]/div[5]/div/a[1]/span').click();
        cy.wait(2000); // Waits for 5000 milliseconds (5 seconds)
        cy.xpath('//*[@id="wishlist-sidebar"]/li/div/div/div[2]/div[1]/button/span').click();
    }
}

export default new WishlistPage();
