import Login from "@apiRequests/Login";
import Lib from "@utils/lib"
import * as Utils from '@utils/constants';

const login = new Login();
const lib = new Lib()

describe('API - Login', () => {


    it("TC_001_Verify that the API correctly accepts a user login request and returns a 200 OK response code.", function() {
        const payload = login.loginbody(this.apiData.email, this.apiData.password)
        lib.postRequest(this.endpoints.login, payload)
        .then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.OK)
            expect(response.body).has.property("tokenType", "Bearer");
            expect(response.body).to.have.property("idToken", response.body.idToken)
            expect(response.body).to.have.property("accessToken", response.body.accessToken)

        })
    });

    it("TC_002_Verify that the API correctly returns a 401 Unauthorized response code when the user submits an invalid login request", function() {
        const payload = login.loginbody(this.apiData.email, this.apiData.wrongpassword)
        lib.postRequest(this.endpoints.login, payload).then(response => {
            expect(response.status).to.eql(Utils.HTTP_STATUS.FORBIDDEN) //Expected 401
            expect(response.body).to.have.property("message", "Wrong email or password.")
        })
    });



})