import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createUserWithEmailAndPassword,
	User as FirebaseUser,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { IAuthCredentials } from '../../interfaces/interfaces'

interface IAuthState {
	user: FirebaseUser | null,
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
}

const initialState: IAuthState = {
	user: null,
	status: 'idle',
	error: null,
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: IAuthCredentials) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', email), { savedShows: [] })
    return userCredential.user
  }
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }: IAuthCredentials) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  }
)

export const logOut = createAsyncThunk(
	'auth/logOut', 
	async () => {
  	await signOut(auth)
	}
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to sign up'
      })
      .addCase(logIn.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to log in'
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null
        state.status = 'idle'
      })
  },
})

export const listenForAuthChanges = createAsyncThunk(
  'auth/listenForAuthChanges',
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser));
    });
  }
);

export const { setUser } = authSlice.actions

export default authSlice.reducer
