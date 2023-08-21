import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userSignUp } from "./signUpAPI"

interface ISignUp {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ISignUpResponse {
  success: boolean
}

export const signUpUser = createAsyncThunk<ISignUpResponse, ISignUp>(
  "user/signUp",
  async (signUpPayload: ISignUp, { rejectWithValue }) => {
    try {
      const response = await userSignUp(signUpPayload)
      if (response.message === "user successfully added!") {
        return response.message
      } else {
        // return rejectWithValue({ message: "Sign-up failed" })
        throw new Error("Something Went Wrong")
      }
    } catch (error: any) {
      const errorData = {
        message: error.message,
        response: error.response,
      }
      return rejectWithValue(errorData)
    }
  },
)
interface SignUpState {
  user: ISignUpResponse | null
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: SignUpState = {
  user: null,
  loading: false,
  error: null,
  success: false,
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.success = true
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false
        state.error = typeof action === "string" ? action : null
        state.success = false
      })
  },
})

export default signUpSlice.reducer
