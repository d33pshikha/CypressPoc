class signUpPage{

    emailInput() {
        return cy.get('#email')
    }

    passwordInput() {
        return cy.get('#password')
    }

    signUpBtn() {
        return cy.contains('Get Started')
    }

    acknowlegementCheckbox() {
        return cy.get('input.chakra-checkbox__input')
    }

    verifyEmailHeading() {
        return cy.contains('h2', 'Verify your email')
    }

    continueBtn() {
        return cy.contains('button', 'Continue')
    }


    selectAckCheckbox() {
        cy.log('Select acknowledgement checkbox')
        this.acknowlegementCheckbox().check({force: true})
    }

    enterNewUserCredentials(email, password) {
        cy.log('Enter user credentials')
        this.emailInput().type(email)
        this.passwordInput().type(password)
    }

    clickGetStartedBtn() {
        cy.log('Click on Get Started button')
        this.signUpBtn().click()
    }

    clickContinueBtn() {
        cy.log('Click on continue button')
        this.continueBtn().click({ timeout: 20000 }) 
    }


}

export default signUpPage