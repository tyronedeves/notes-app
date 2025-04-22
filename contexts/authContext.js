import { createContext, useState, useEffect, useContext } from "react"
import authService from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // Wraps the application so that the components have access to the state of the context
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // This is how we check the user when the page loads
    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        setLoading(true)
        const response = await authService.getUser()

        if (response?.error) {
            setUser(null)
        } else {
            setUser(response) // Here is coming from the auth service
        }
        setLoading(false)
    }

    const login = async (email, password) => {
        const response = await authService.login(email, password)

        if (response?.error) {
            return response
        }
        await checkUser()
        return { success: true }
    }

    const register = async (email, password) => {
        const response = await authService.register(email, password)

        if (response?.error) {
            return response
        }
        return login(email, password) // Auto-login after register
    }

    const logOut = async () => {
        await authService.logOut()
        setUser(null)
        await checkUser()
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)