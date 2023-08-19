import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import loginReducer from "../features/login/loginSlice"
import signUpReducer from "../features/sign-up/signUpSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    signUp: signUpReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
