import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLogin } from "./loginAPI"

type LoginCredentials = {
  email: string
  password: string
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await userLogin(email, password)
      return response.data 
    } catch (error) {
      return rejectWithValue(error) 
    }
  },
)

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  },
})

export default loginSlice.reducer
