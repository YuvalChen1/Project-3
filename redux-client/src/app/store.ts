import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import loginReducer from "../features/login/loginSlice"
import signUpReducer from "../features/sign-up/signUpSlice"
import vacationsReducer from "../features/vacations/vacationsSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    vacations: vacationsReducer,
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
