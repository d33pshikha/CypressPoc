import basePage from "./basePage"

class dashboard extends basePage{

    greetings() {
        return cy.get('h1.chakra-heading')
    }

    unlockOpportunitiesLink() {
        return cy.xpath('//div[text()="Opportunities"]//button[text()="Unlock"]')
    }

    sideNavLink(linkText) {
        return cy.get('ul[role="list"]').contains('div', linkText)
    }

    heading(text) {
        return cy.contains('h1', text)
    }

    acknowledgementProceedBtn() {
        return cy.xpath('//p[contains(text(), "I acknowledge")]//following-sibling::button[text()="Proceed"]')
    }

    personalizedPortfolioContinueBtn() {
        return cy.xpath('//h2[text()="Build your personalized portfolio"]//ancestor::div[contains(@class, "chakra-stack")]//button[text()="Continue"]')
    }

    proposalBtn(text) {
        return cy.get('button>p').contains(text)
    }

    clickUnlockOpportunities() {
        cy.log('On Dashboard, Click "Unlock Opportunities" link from the left hand navigation')
        this.unlockOpportunitiesLink().click({force : true})
    }

    clickSideNavLink(linkText) {
        cy.log(`Click on the "${linkText}"`)
        this.sideNavLink(linkText).should('be.enabled').click()
    }

    proceedAfterConfirmOpportunitiesAck() {
        cy.log('Click on the proceed button on confirm opportunities acknowledgement')
        this.acknowledgementProceedBtn().click()
    }

    clickContinueBtnToPersonalizeProposal() {
        cy.log('Click on the continue button to proceed to Personalize Proposal')
        this.personalizedPortfolioContinueBtn().click({force : true})
    }

    clickProposalBtn(text) {
        cy.log(`Click on the ${text} button`)
        this.proposalBtn(text).click()
    }
    


    




}

export default dashboard