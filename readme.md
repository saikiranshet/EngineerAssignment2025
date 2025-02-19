## Cypress Automation 

This repository contains Cypress test automation for an e-commerce platform, including UI validation, search functionality, order placement, and wishlist management.


# Prerequisites

* Node.js (>=14.x)
* Cypress (>=12.x)
* Dependencies installed via npm install


# Test Execution Order
To execute tests in a specific order, update cypress.config.js:

specPattern: [
  "cypress/e2e/registartion.cy.js",
  "cypress/e2e/search.cy.js",
  "cypress/e2e/order.cy.js",
  "cypress/e2e/wishlist.cy.js"
]

# Alternatively, run tests sequentially using npm scripts:

npm run test:registration && npm run test:search && npm run test:order && npm run test:wishlist



## Descriiption
Automation of website

Going to the Website: h-ps://magento.so4waretes6ngboard.com/ and automate below test
cases according to the requirements men4oned.
Test Case (A): Registra4on flow with login validation - You Can find the code in registration.js
Test Case (B): Place order with multiple products (apply price calcula4on checks) - You can find the code in order.js
Test Case (C): Add products in Wishlist and checkout from wishlist - You can find the code in wishlist.js
Test Case (D): Search and validate results - You can find the code iin search.js

[Folder Structure for above Testcase is cypress/integrations/e2e/~ {All Code are here}]

# Installing



# Reporting Used

Allure Reporting



# Execution
Stpe1 - npx cypress open





# OtherTasks Folder

The `OtherTasks` folder contains various types of test cases and performance-related tasks. Specifically, it includes:

- **Manual Test Cases**: These are test cases that require manual execution and verification.
- **API Automation using postman**: These test cases are designed to test the functionality attahced is the exported file from Postman.
- **Performance**: This section includes tasks and test cases related to performance testing.


