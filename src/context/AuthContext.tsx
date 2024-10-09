import {
	createUserWithEmailAndPassword,
	User as FirebaseUser,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { IAuthContext, IAuthContextProvider } from '../interfaces/interfaces.js'


const AuthContext = createContext<IAuthContext | undefined>(undefined)

export function AuthContextProvider({children}: IAuthContextProvider) {
	const [user, setUser] = useState<FirebaseUser | null>(null)

	function signUp(email: string, password: string) {
		createUserWithEmailAndPassword(auth, email, password)
		setDoc(doc(db, 'users', email), {
			savedShows: []
		})
	}

	function logIn(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logOut() {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		})
		return () => {
			unsubscribe()
		}
	},[])

	return (
		<AuthContext.Provider value={{signUp, logIn, logOut, user}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}