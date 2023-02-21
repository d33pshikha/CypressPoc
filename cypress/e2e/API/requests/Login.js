import Base from "./Base"
class Login extends Base{

    loginbody(email, pass) {
        const obj = {}
        obj.username = email
        obj.password = pass
        
        return obj
    }

    

}
export default Login;