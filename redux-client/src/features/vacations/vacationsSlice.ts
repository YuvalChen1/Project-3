import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addSubscriber, getVacationsApi } from "./vacationsAPI"
import { useAppSelector } from "../../app/hooks"

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

export interface IFollower {
  userId: number
  vacationId: number
}

export const addSubscriberToDB = createAsyncThunk(
  "followers/followersAsync",
  async ({ userId, vacationId }: IFollower) => {
    try {
      const response = await addSubscriber(userId, vacationId)
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
    },
  ],
  status: "idle",
}

const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    vacationSubscribe: (state, action: PayloadAction<number>) => {
      // const vacationId = action.payload
      // const vacation = state.vacation.find((v) => v.id === vacationId)

      // if (vacation) {
      //   vacation.isSubscribed = true
      //   vacation.numberOfSubscribers += 1
      // }
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
      .addCase(addSubscriberToDB.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addSubscriberToDB.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(addSubscriberToDB.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { vacationSubscribe } = vacationSlice.actions

export default vacationSlice.reducer
