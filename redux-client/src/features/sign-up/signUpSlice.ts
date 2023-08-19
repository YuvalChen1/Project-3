import { createAsyncThunk } from "@reduxjs/toolkit"
import { userSignUp } from "./signUpAPI"
import { createSlice } from "@reduxjs/toolkit"

interface ISignUp {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (signUpPayload: ISignUp, { rejectWithValue }) => {
    try {
      const response = await userSignUp(signUpPayload)
      return response.data // Return the response data if signup is successful
    } catch (error: any) {
      // Extract relevant information from the AxiosError object
      const errorData = {
        message: error.message,
        response: error.response,
      }
      return rejectWithValue(errorData) // Return the extracted error data
    }
  },
)

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
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
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false
        state.error = typeof action === "string" ? action : null
      })
  },
})

export default signUpSlice.reducer
