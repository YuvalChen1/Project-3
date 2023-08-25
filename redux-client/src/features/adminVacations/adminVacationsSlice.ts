import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addNewVacationApi, deleteVacationApi } from "./adminVacationsAPI"
import { IVacationAPI } from "./adminVacationsAPI"

export interface IFollower {
  userId: number
  vacationId: number
}

export const addNewVacation = createAsyncThunk(
  "addNewVacation/addNewVacationAsync",
  async (vacation: IVacationAPI) => {
    try {
      const response = await addNewVacationApi(vacation)
      if (!response) throw new Error("")
      return response
    } catch (error) {
      throw new Error("Something Went Wrong")
    }
  },
)

export const deleteVacation = createAsyncThunk(
  "deleteVacation/deleteVacationAsync",
  async (vacationId: number) => {
    try {
      const response = await deleteVacationApi(vacationId)
      if (!response) throw new Error("")
      return response
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
      .addCase(addNewVacation.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addNewVacation.fulfilled, (state) => {
        state.status = "fulfilled"
      })
      .addCase(addNewVacation.rejected, (state) => {
        state.status = "failed"
      }) //////////////////////////////////////////////////////////////////////
      .addCase(deleteVacation.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteVacation.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(deleteVacation.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export default vacationSlice.reducer
