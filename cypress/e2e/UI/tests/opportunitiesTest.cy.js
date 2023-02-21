import Dashboard from "@pageObjects/dashboard";
import UnlockOpportunities from "@pageObjects/unlockOpportunitiesPage";
import '@hooks/uiHooks'

const dashboard = new Dashboard()
const unlockOpportunities = new UnlockOpportunities()

describe('The Family Store - Opportunities', () => {

    beforeEach(function () {
        cy.getUserData().then((credentials) => {
            cy.login(credentials.email, credentials.password)
        });
    })

    it('Verify User is able to Unlock Opportunities by completing Investor profile', function () {
        cy.log('Click on the unlock opportunities button on the dashboard')
        dashboard.clickUnlockOpportunities()
        unlockOpportunities.pageHeading().should('have.text', this.data.pageHeadings.opportunities.completeProfile)
        unlockOpportunities.selectUnlockOppAndGetStarted()
        unlockOpportunities.enterPersonalInfo(this.data.nationality, this.data.region)
        unlockOpportunities.longTermInvestmentMsg().should('contain', this.data.messages.opportunities.longTermInvestment)
        unlockOpportunities.selectInvestmentType(this.data.opportunitiesDetails.selectInvestement)
        unlockOpportunities.selectInvestmentExperience(this.data.opportunitiesDetails.investmentExperience)
        unlockOpportunities.selectInvestment(this.data.opportunitiesDetails.investmentType)
        unlockOpportunities.pageHeading().should('have.text', this.data.pageHeadings.opportunities.buildPortfolio)
        unlockOpportunities.clickSaveAndExitBtn()
        dashboard.personalizedPortfolioContinueBtn().should('be.visible')
        dashboard.sideNavLink('Opportunities').click()
        dashboard.proceedAfterConfirmOpportunitiesAck()
        dashboard.heading('Opportunities').should('have.text', 'Opportunities')
    })

})