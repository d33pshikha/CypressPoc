class Base {


    authToken(token) {
        let obj = {}
        obj.Authorization = 'Bearer ' + token
        return obj
    }

    

}
export default Base;