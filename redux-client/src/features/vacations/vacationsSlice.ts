import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  addSubscriberApi,
  getVacationsByUserIdApi,
  unSubscribeApi,
} from "./vacationsAPI"

export const getVacations = createAsyncThunk(
  "vacations/vacationsAsync",
  async (userId: number) => {
    try {
      const response = await getVacationsByUserIdApi(userId)
      if (!response) throw new Error("")
      return response
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
      const response = await addSubscriberApi(userId, vacationId)
      if (!response) throw new Error("")
      return response.data
    } catch (error) {
      throw new Error("Something Went Wrong")
    }
  },
)

export const removeSubscriberFromDB = createAsyncThunk(
  "unFollowers/unFollowersAsync",
  async ({ userId, vacationId }: IFollower) => {
    try {
      const response = await unSubscribeApi(userId, vacationId)
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
    startDate: string
    endDate: string
    price: number
    image: string
    subscribers: number
    isSubscribed: boolean
  }>
  status: "idle" | "loading" | "failed" | "fulfilled"
}

const initialState: IVacation = {
  vacation: [
    {
      id: 0,
      destination: "",
      description: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      price: 0,
      image: "",
      subscribers: 0,
      isSubscribed: false,
    },
  ],
  status: "idle",
}

const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVacations.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getVacations.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.vacation = action.payload.map((vacation: any) => ({
          ...vacation,
          startDate: new Date(vacation.startDate).toISOString(),
          endDate: new Date(vacation.endDate).toISOString(),
        }))
      })
      .addCase(getVacations.rejected, (state, action) => {
        state.status = "failed"
      }) //////////////////////////////////////////////////////////////////////
      .addCase(addSubscriberToDB.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addSubscriberToDB.fulfilled, (state) => {
        state.status = "fulfilled"
      })
      .addCase(addSubscriberToDB.rejected, (state) => {
        state.status = "failed"
      }) //////////////////////////////////////////////////////////////////////
      .addCase(removeSubscriberFromDB.pending, (state) => {
        state.status = "loading"
      })
      .addCase(removeSubscriberFromDB.fulfilled, (state) => {
        state.status = "fulfilled"
      })
      .addCase(removeSubscriberFromDB.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export default vacationSlice.reducer
