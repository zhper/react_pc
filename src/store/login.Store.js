import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from "@/utils"
class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }

    getTokenByFun = async ({ mobile, code }) => {
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile,
            code
        })
        this.token = res.data.token
        setToken(this.token)
    }

    logOut = () => {
        this.token = ''
        removeToken()
    }
}

export default LoginStore