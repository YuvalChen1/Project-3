import axios from "axios"
import { url } from "../sign-up/signUpAPI"

export async function getVacationsByUserIdApi(userId: number) {
  try {
    const result = await axios.get(`${url}/vacations?userId=${userId}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    return result
  } catch (error) {
    throw new Error("Vacations Fetch Failed")
  }
}

export async function addSubscriberApi(userId: number, vacationId: number) {
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

export async function unSubscribeApi(userId: number, vacationId: number) {
  try {
    const result = await axios.delete(`${url}/followers/delete`, {
      data: {
        userId,
        vacationId,
      },
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    return result
  } catch (error) {
    throw new Error("Something Went Wrong")
  }
}
