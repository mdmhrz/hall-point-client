import { use } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"

const useAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo
}

export default useAuth;