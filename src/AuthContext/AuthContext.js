/* Context API */
import {React,createContext,useEffect,useContext,useState} from 'react'
import {auth} from "../Database/Firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut, signInWithPopup,  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,} from "firebase/auth"
const AuthContext = createContext({//  We create a variable and set it to create Context
    currentUser:null,
    register:()=>Promise,
    login:()=>Promise,
    logout:()=>Promise,
    signInWithGoogle:()=>Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise,
})
export const useAuth=()=>useContext(AuthContext)
// We create a Provider function which can be used as parent of other components where the child would be required 
export default function AuthContextProvider(props){
    //Here are the states and methods which can be used by other components
    const [currentUser,setCurrentUser] = useState({})
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
          setCurrentUser(user ? user : null)
        })
        return () => {
          unsubscribe()
        }
      }, [])
      useEffect(() => {
        console.log('The user is', currentUser)
      }, [currentUser])
    const register =(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout=()=>{
        signOut(auth)
    }
    function signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      return signInWithPopup(auth, provider)
    }
    function forgotPassword(email) {
      return sendPasswordResetEmail(auth, email, {
        url: `http://localhost:3000/login`,
      })
    }
    function resetPassword(oobCode, newPassword) {
      return confirmPasswordReset(auth, oobCode, newPassword)
    }
    const value={
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        forgotPassword,
        resetPassword,
    }
   
    // Here the value prop is needed by other components 
    return(
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>)
}
