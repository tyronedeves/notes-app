import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService ={
    //register users

    async register (email,password){
        try {
            const response = await account.create(ID.unique(), email, password)
            return response
        } catch (error) {
           return {
            error: error.message || 'Registration failed. Please try again'
           }
        }
    },
// Login function
    async login (email,password){
        try {
            const response = await account.createEmailPasswordSession( email, password)
            return response
        } catch (error) {
           return {
            error: error.message || 'Login failed. Please check login details'
           }
        }
    },
    // get logged in user

    async getUser() {
        try {
            return await account.get()
        } catch (error) {
            return null;
        }
    },

    // logout user
    async logOut() {
        try {
            await account.deleteSession('current')
        } catch (error) {
            return {
                error: error.message || 'Log Out failed. try again'
               }
        }
    }
}

export default authService;