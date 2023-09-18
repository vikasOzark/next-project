const { cookies } = require("next/headers");


export const isAuthenticated = () => {
        isToken = cookies().get("token")
        if (isToken){
            return true
        } else {
            return false
        }
    }