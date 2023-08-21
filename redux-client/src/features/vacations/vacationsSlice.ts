import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getVacationsApi } from "./vacationsAPI"

export const getVacations = createAsyncThunk(
  "vacations/vacationsAsync",
  async () => {
    try {
      const response = await getVacationsApi()
      if (!response) throw new Error("")
      return response.data
    } catch (error) {
      throw new Error("Something Went Wrong")
    }
  },
)
interface IVacation {
  vacation: Array<{
    id: number
    destination: string
    description: string
    startDate: Date
    endDate: Date
    price: number
    image: string
    isSubscribed: boolean
    numberOfSubscribers: number
  }>
  status: "idle" | "loading" | "failed"
}

const initialState: IVacation = {
  vacation: [
    {
      id: 0,
      destination: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      image: "",
      isSubscribed: false,
      numberOfSubscribers: 0,
    },
  ],
  status: "idle",
}

const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    vacationSubscribe: (state, action: PayloadAction<number>) => {
      const vacationId = action.payload
      const vacation = state.vacation.find((v) => v.id === vacationId)

      if (vacation) {
        vacation.isSubscribed = true
        vacation.numberOfSubscribers += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacations.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getVacations.fulfilled, (state, action) => {
        state.status = "idle"
        state.vacation = action.payload
      })
      .addCase(getVacations.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export const { vacationSubscribe } = vacationSlice.actions

export default vacationSlice.reducer
