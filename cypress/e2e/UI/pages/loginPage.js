import basePage from "./basePage"

class loginPage extends basePage {

    emailInput() {
        return cy.get('#email')
    }

    passwordInput() {
        return cy.get('#password')
    }

    loginBtn() {
        return cy.get('button[type="submit"]')
    }

    signUpLink() {
        return cy.contains('Sign up')
    }


    login(email, password) {
        cy.log(`Log-in to the application with user - ${email}`)
        this.emailInput().type(email)
        this.passwordInput().type(password)
        this.loginBtn().click()
    }

    navigateToSignUpPage() {
        cy.log('Navigate to The Family Store login page')
        this.signUpLink().click()
    }


}

export default loginPage