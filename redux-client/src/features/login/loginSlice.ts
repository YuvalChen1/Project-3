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
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

interface ILogin {
  user: { email: string; password: string }
  loading: boolean
  error: string | null
  status: "idle" | "loading" | "failed" | "fulfilled"
}

const initState: ILogin = {
  user: { email: "", password: "" },
  loading: false,
  error: null as string | null,
  status: "idle",
}

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.status = "fulfilled"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
        state.status = "failed"
      })
  },
})

export default loginSlice.reducer
