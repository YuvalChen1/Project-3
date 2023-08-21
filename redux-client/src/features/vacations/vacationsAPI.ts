import axios from "axios"
import { url } from "../sign-up/signUpAPI"

import { IFollower } from "./vacationsSlice"

export async function getVacationsApi() {
  try {
    const result = await axios.get(`${url}/vacations`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    return result
  } catch (error) {
    throw new Error("Vacations Fetch Failed")
  }
}

export async function addSubscriber(userId: number, vacationId: number) {
  try {
    const result = await axios.post(
      `${url}/followers/new`,
      {
        userId,
        vacationId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
    )
    return result
  } catch (error) {
    throw new Error("Something Went Wrong")
  }
}
