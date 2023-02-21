import basePage from "./basePage"

class editProposalPage extends basePage {

    modal() {
        return cy.get('div.chakra-modal__content-container')
    }

    updateProposalHeading() {
        return cy.get('div.chakra-modal__content-container').contains('p', 'Update your proposal')
    }

    timeHorizonSlider() {
        return cy.get('div[role="slider"][id="slider-thumb-investmentDurationInYears"]')
    }

    timeHorizonLabel() {
        return cy.get('div[aria-label="Time horizon slider"]').find('p')
    }


    annualIncreaseInput() {
        return cy.get('input[name="annualInvestmentTopUpAmountInUSD"]')
    }


    updateTimeHorizon(steps) {
        cy.log('Update time horizon slider value')
        const arrows = '{rightarrow}'.repeat(steps)
        this.timeHorizonSlider().eq(1).click().type(arrows)
    }


    selectIncreaseAnnualInvestment(value) {
        cy.log('Select Increase annual investment')
        super.drpDwnArrow('topUpInvestmentAnnually').eq(1).click({ force: true })
        super.drpDwnOption().contains(value).click({ force: true })
    }

    enterAnnualInvestmentIncrease(value) {
        cy.log(`Enter annual investment increase value - '${value}'`)
        this.annualIncreaseInput().eq(0).clear().type(value, { force: true })
    }

    clickUpdateBtn() {
        cy.log('Click Update button')
        super.submitBtn().eq(1).contains('Update proposal').click({ force: true })
    }


}

export default editProposalPage