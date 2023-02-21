import Login from "@apiRequests/Login";
import SignUp from "@apiRequests/SignUp";
import Lib from "@utils/lib"
import * as Utils from '@utils/constants';

const login = new Login();
const signup = new SignUp();
const lib = new Lib()

describe('API - Nationality,Region and Investor Type Selection', () => {    
    let token_id;

    beforeEach(function () {


        const payload = login.loginbody(this.apiData.email, this.apiData.password)
        lib.postRequest(this.endpoints.login, payload).then(response => {
                expect(response.status).to.eql(200)
                token_id = response.body.accessToken
            })


    })

    it("TC_001_Verify that the API correctly accepts the user's selected nationality and region and returns a 200 OK response code.", function() {
        const headers = login.authToken(token_id)
    
        lib.getRequest(this.endpoints.getUser, headers).then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.OK)
            expect(response.body.profile).has.property("nationality", response.body.profile.nationality);
            expect(response.body.profile).has.property("region", response.body.profile.region);
            expect(response.body.profile).has.property("investorType", response.body.profile.investorType);
            expect(response.body.profile).has.property("isTaxableInUS", response.body.profile.isTaxableInUS);

        })


    });
    it("TC_002_Verify Update user details with the investor type and taxable status", function(){
        const headers = login.authToken(token_id)
        
        const payload = signup.updatedetails_body(this.apiData.existingUserDetails)
        lib.postRequest(this.endpoints.getUserProfile, payload, headers)
        .then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.OK)
            expect(response.body).to.have.property("nationality", "NL");
            expect(response.body).to.have.property("region", "KSA-E");
            expect(response.body).to.have.property("isTaxableInUS", false);

        })

    });


})