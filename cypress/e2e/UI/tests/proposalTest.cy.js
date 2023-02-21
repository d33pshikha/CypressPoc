import Dashboard from "@pageObjects/dashboard";
import InvestmentGoalsPage from "@pageObjects/investmentGoalsPage";
import ProposalPage from "@pageObjects/proposalPage";
import EditProposalPage from "@pageObjects/editProposalPage";
import '@hooks/uiHooks'

const dashboard = new Dashboard()
const investmentGoalsPage = new InvestmentGoalsPage()
const proposalPage = new ProposalPage()
const editProposalPage = new EditProposalPage()


describe('The Family Store - Proposal Workflow', () => {

    beforeEach(function () {
        cy.getUserData().then((credentials) => {
            cy.login(credentials.email, credentials.password)
        });

    })

    it('Verify user ia able to build personalized portfolio by completing Investment goals and risk investments', function () {
        dashboard.clickContinueBtnToPersonalizeProposal()
        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.portfolioBeneficiary)
        investmentGoalsPage.selectRadio(this.data.investmentDetails.beneficiary)

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.investmentGoals)
        investmentGoalsPage.selectCheckboxAndProceed(this.data.investmentDetails.goals)

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.timeHorizon)
        investmentGoalsPage.timeHorizonValue().should('have.text', this.data.investmentDetails.timeHorizon)
        investmentGoalsPage.proceedToNextPage()

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.initialAmount)
        investmentGoalsPage.investmentAmountMsg().should('have.text', this.data.messages.investmentGoals.maxAmount)
        investmentGoalsPage.enterInvestmentAmount(this.data.investmentDetails.amount)
        investmentGoalsPage.proceedToNextPage()

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.generateIncome)
        investmentGoalsPage.selectRadio(this.data.investmentDetails.generateIncome)
        investmentGoalsPage.desiredAnnualIncomeSection().should('be.visible')
        investmentGoalsPage.proceedToNextPage()

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.furtherPref)
        investmentGoalsPage.selectRadioAndProceedToNextPage(this.data.investmentDetails.furtherPref)

        investmentGoalsPage.pageHeading().should('have.text', this.data.pageHeadings.investmentGoals.esgCompliant)
        investmentGoalsPage.selectRadioAndProceedToNextPage(this.data.investmentDetails.esgCompliant)

        investmentGoalsPage.clickRiskAssessmentContinueBtn()

        Object.entries(this.data.pageHeadings.riskAssessment).forEach((entry) => {
            const [key, value] = entry;
            cy.log(value);
            investmentGoalsPage.pageHeading().should('have.text', value)
            investmentGoalsPage.selectRadioAndProceedToNextPage('I agree')
        })

        investmentGoalsPage.cancelFeedbackIfVisible()
        investmentGoalsPage.pageHeading().should('have.text', this.data.messages.riskAssessment.investmentStyle)
        investmentGoalsPage.button('Confirm and View Proposal').should('be.visible').and('be.enabled')

        //investmentGoalsPage.clickSaveAndExitBtn()
        investmentGoalsPage.clickConfirmAndViewProposal()
        proposalPage.heading().should('be.visible')


    })

    it('Verify user is able to modify Existing Proposal', function () {
        dashboard.clickProposalBtn('View details')
        proposalPage.heading().should('be.visible')
        proposalPage.clickEditDetailsBtn()
        editProposalPage.updateProposalHeading().should('exist')
        editProposalPage.updateTimeHorizon(this.data.editProposal.timeHorizonAddYears)
        editProposalPage.timeHorizonLabel().should('contain', this.data.editProposal.timeHorizon)
        editProposalPage.selectIncreaseAnnualInvestment(this.data.editProposal.increaseAnnualInvestment)
        editProposalPage.enterAnnualInvestmentIncrease(this.data.editProposal.annualInvestment)
        editProposalPage.clickUpdateBtn()
        editProposalPage.modal().should('not.exist')

    })

})