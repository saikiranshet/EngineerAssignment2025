## Cypress Automation 

This repository contains Cypress test automation for an e-commerce platform, including UI validation, search functionality, order placement, and wishlist management.


# Prerequisites

* Node.js (>=14.x)
* Cypress (>=12.x)
* Dependencies installed via npm install


# Test Execution Order
To execute tests in a specific order, update cypress.config.js:

specPattern: [
  "cypress/e2e/registartion.js",
  "cypress/e2e/search.js",
  "cypress/e2e/order.js",
  "cypress/e2e/wishlist.js"
]

# Alternatively, run tests sequentially using npm scripts:

npm run test:registration 
npm run test:search
npm run test:order
npm run test:wishlist


## Descriiption
Automation of website

Going to the Website: h-ps://magento.so4waretes6ngboard.com/ and automate below test
cases according to the requirements men4oned.
Test Case (A): Registra4on flow with login validation - You Can find the code in registration.js
Test Case (B): Place order with multiple products (apply price calcula4on checks) - You can find the code in order.js
Test Case (C): Add products in Wishlist and checkout from wishlist - You can find the code in wishlist.js
Test Case (D): Search and validate results - You can find the code iin search.js

[Folder Structure for above Testcase is cypress/integrations/e2e/~ {All Code are here}]

# Installing and Execution

📌 Step 1: Delete Old Dependencies (If Needed)
If you're facing issues, it's best to clean your setup first:

rm -rf node_modules package-lock.json
📌 Step 2: Install All Dependencies
npm install

This will install everything listed in your package.json file, including:

📌 Step 3: Verify Cypress Installation
npx cypress -v
If it works, proceed to the next step.

If you see a "Permission denied" error, run:
chmod +x node_modules/.bin/cypress

npx cypress install


📌 Step 4: Open Cypress
To open Cypress in GUI mode:

npx cypress open
To run Cypress in headless mode:
npx cypress run

📌 Step 5: Run Specific Tests
Run registration tests: npm run test:registration
Run order tests: npm run test:order

# Reporting Used

Allure Reporting

🛠 Install and Run with Allure Reporter

cmd - npm install --save-dev @shelex/cypress-allure-plugin

from automation - Run this below command [ This is still not working Need to debug]
cmd - npx cypress run --env allure=true
cmd - npx allure generate allure-results --clean -o allure-report
cmd - npx allure open allure-report

# OtherTasks Folder

The `OtherTasks` folder contains various types of test cases and performance-related tasks. Specifically, it includes:

- **Manual Test Cases**: These are test cases that require manual execution and verification.
- **API Automation using postman**: These test cases are designed to test the functionality attahced is the exported file from Postman.
- **Performance**: This section includes tasks and test cases related to performance testing.



You can also find the recordings in screenrecords folder 


🚀 # Project Status & Enhancements Needed
|
✅ # Current Status:
The framework is functional, but some areas require further enhancements.
Order-related tests are still failing and need investigation.
Allure report not working - Need investigation


🔧 Enhancements Needed:
Improve test stability and handle intermittent failures.
Optimize selectors and improve test data management.
Enhance reporting (Allure & Mochawesome) for better insights.
Review Cypress best practices for improved maintainability.

On the right track, but things take time! A bit more polishing, and we’ll have a rock-solid automation framework for sure.