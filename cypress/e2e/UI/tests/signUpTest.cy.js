import LoginPage from "@pageObjects/loginPage"
import PublicInbox from "@pageObjects/publicInbox"
import SignUpPage from "@pageObjects/signUpPage"
import WelcomePage from "@pageObjects/welcomePage"
import Dashboard from "@pageObjects/dashboard";
import ProfilePage from "@pageObjects/profilePage";
import { faker } from '@faker-js/faker';
import '@hooks/uiHooks'

const loginPage = new LoginPage()
const signUpPage = new SignUpPage()
const publicInbox = new PublicInbox()
const welcomePage = new WelcomePage()
const dashboard = new Dashboard()
const profilePage = new ProfilePage()



describe('The Family Store - Sign Up Workflow', () => {

    before(() => {
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        let email = 'ecvg_' + id +'@mailinator.com'
        let password = faker.internet.password(15, false, /\w/, 'P@s1')
        cy.setUserData(email, password)
        
    })

    it('Validate user is able to create a new user account', function () {

        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName().replace('\'', '')
        //const mobile = faker.phone.number('9#########')
        const country = this.data.country
        const mobile = this.data.mobile
        const otp = this.data.otp

        // Intercept recaptcha and otp verify APIs
        cy.intercept(this.interceptData.method.post, this.interceptData.endpoint.captcha, this.interceptData.json.captcha)
        cy.intercept(this.interceptData.method.post, this.interceptData.endpoint.sendOtp, this.interceptData.json.sendOtp)
        cy.intercept(this.interceptData.method.post, this.interceptData.endpoint.otp, { statusCode: 200 })

        loginPage.navigateToSignUpPage()
        signUpPage.signUpBtn().should('be.disabled')
        cy.getUserData().then((credentials) => {
            signUpPage.enterNewUserCredentials(credentials.email, credentials.password)
          });
        signUpPage.selectAckCheckbox()
        signUpPage.signUpBtn().should('be.enabled')
        signUpPage.clickGetStartedBtn()
        signUpPage.verifyEmailHeading().should('be.visible')
        cy.getUserData().then((credentials) => {
            publicInbox.verifyEmail(this.data.publicInboxURL, credentials.email.split('@')[0])
        })
        signUpPage.clickContinueBtn()

        welcomePage.accountCreationNotification(this.data.messages.signup.accountCreation).should('be.visible')
        welcomePage.welcomeMsg().should('have.text', this.data.messages.signup.welcome)

        welcomePage.investmentOptions().should('have.length', 2).each((item, index, list) => {
            expect(item.text()).to.eq(this.data.messages.signup.investmentHelp[index])
        })

        welcomePage.selectInvestmentOptionAndContinue(this.data.messages.signup.investmentHelp[0])

        profilePage.pageHeading().should('have.text', this.data.pageHeadings.profile.secureAccount)
        profilePage.selectCaptcha()
        profilePage.enterProfileDetails(firstName, lastName, country, mobile)
        profilePage.clickSendVerificationBtn()


        profilePage.pageHeading().should('have.text', this.data.pageHeadings.profile.verifyPhone)
        //profilePage.verifyOtp(faker.random.numeric(6))
        profilePage.verifyOtp(otp)
        dashboard.greetings().should('contain', firstName)
        dashboard.s
    })
})