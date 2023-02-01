
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"
function AuthComponent ({ children }) {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    }
    return <Navigate to='/login' replace />
}

export default AuthComponent

