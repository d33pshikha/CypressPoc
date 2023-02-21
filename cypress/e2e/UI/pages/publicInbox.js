class publicInbox {


    verifyEmail(publicInboxURL, email) {
        cy.origin(publicInboxURL, { args: { email } }, ({ email }) => {
            cy.visit('/')
            Cypress.on('uncaught:exception', () => false)
            cy.get('input[name="search"]').eq(0).type(email+ '{enter}')
            cy.contains('td', 'Verify Email').click()
            cy.get('div.from.ng-binding').eq(0).invoke('text').then((to) => {
                if(to === " ") {
                    cy.reload()
                    cy.wait(5000)
                }
            })
            
            cy.get('td>a[href*="auth"]').invoke('attr', 'target', '_self').click({force: true})
        })
    }

    

}

export default publicInbox