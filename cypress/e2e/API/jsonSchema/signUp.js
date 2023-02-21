class signUp {

    static get signUpSuccess() {
        return {
            "type": "object",
            "properties": {
              "roles": {
                "type": "array",
                "items": [
                  {
                    "type": "string"
                  }
                ]
              },
              "isSocial": {
                "type": "boolean"
              },
              "idToken": {
                "type": "string"
              },
              "expiresIn": {
                "type": "integer"
              },
              "refreshToken": {
                "type": "null"
              },
              "accessToken": {
                "type": "string"
              },
              "tokenType": {
                "type": "string"
              }
            },
            "required": [
              "roles",
              "isSocial",
              "idToken",
              "expiresIn",
              "refreshToken",
              "accessToken",
              "tokenType"
            ]
          }
    }




}

export default signUp