import LoginPage from "@pageObjects/loginPage"

const loginPage = new LoginPage()

let credentials = {}
Cypress.Commands.add('navigateToApp', () => {
    cy.visit('/')
})

// New command to login user
Cypress.Commands.add('login', (email, password)=>{
    cy.wait(2000)
    loginPage.login(email, password)

})

Cypress.Commands.add("setUserData", (email, password) => {
  credentials.email = email
  credentials.password = password
  return credentials;
});

Cypress.Commands.add("getUserData", () => {
  return credentials;
});


Cypress.Commands.add('readCsv', (filename) => {
  cy.fixture(filename + '.csv')
          .then(file => file.split('\n').map(row => row.trim()))  
          .then(rows => {
              const data = rows.slice(1)                         
                   .map(row => row.split('|')  
                   .map(col => col.trim())                     
                  )                   
              return data
          })
})