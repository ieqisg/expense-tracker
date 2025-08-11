// Unauthorized users cant access certain pages
import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../components/client";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        }) 

        if (error) {
            console.error("Error Signing Up")
            return {success: false, error}
        }
        return {success: true, data}
    }

    const loginNewUser = async(email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                console.error('Log in error occured: ', error)
                return { success: false, error: error.message }
            }
            console.log("Sign in success", data)
            return {success: true, data}
        } catch(error) {
            console.error("Unexpeceted error during sign in: ", error.message)
            return { success: false, error: error.message }
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } } ) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    
    const signOut = () => {
        const { error } = supabase.auth.signOut()
        if (error) {
            console.error("There was an error.", error)
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signOut, loginNewUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}