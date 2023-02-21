before(() => {
    cy.fixture('testData').as('data')
    cy.fixture('interceptTestData').as('interceptData')
    cy.fixture('apiTestData').as('apiData')
    cy.fixture('endpoints').as('endpoints')
})
