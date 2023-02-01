import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from "@/utils"
class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    getUserInfo = async () => {
        const res = await http.get('/user/profile')
        // this.userInfo = res.data
        this.setUserInfo(res.data)
    }
    setUserInfo = (data) => {
        this.userInfo = data
    }

}

export default UserStore