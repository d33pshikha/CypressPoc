import Base from "./Base"

class SignUp extends Base {

    signupUser(myemail, mypass) {
        let body = {}
        let service = {}
        body.email = myemail
        body.password = mypass

        service.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36"
        service.agreedAt = new Date().toISOString()
        service.ipAddress = '::1'
        body.termsOfService = service

        return body;

    }

    updatedetails_body(data) {
        const body = {}
        const investorSurvey = {}

        body.firstName = data.firstName
        body.lastName = data.lastName
        body.countryOfResidence = data.countryOfResidence
        body.nationality = data.nationality
        body.region = data.region
        body.phoneCountryCode = data.phoneCountryCode
        body.phoneNumber = data.phoneNumber
        body.isTaxableInUS = data.isTaxableInUS
        body.isDefinedSophisticatedByCMA = data.isDefinedSophisticatedByCMA
        body.isAccreditedByCBB = data.isAccreditedByCBB
        body.investmentExperience = data.investmentExperience
        investorSurvey.investMinimumAmount = data.investMinimumAmount
        investorSurvey.whenToStartInvestment = data.whenToStartInvestment
        investorSurvey.interestedInvestments = data.interestedInvestments
        investorSurvey.investmentExperience = data.investmentExperience
        investorSurvey.priorInvExperience = data.priorInvExperience
        investorSurvey.otherInterestedInvDetails = data.otherInterestedInvDetails
        investorSurvey.otherPriorDetails = data.otherPriorDetails
        body.investorSurvey = investorSurvey

        return body
    }

}
export default SignUp;