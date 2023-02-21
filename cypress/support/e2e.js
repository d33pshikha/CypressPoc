import './commands'
import '@cypress/xpath'
import '@shelex/cypress-allure-plugin'
import 'cypress-mochawesome-reporter/register';
import '@hooks/hooks'
import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);
// import 'allure-commandline';


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})