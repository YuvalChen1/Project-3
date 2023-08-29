import axios from "axios"
import { url } from "../sign-up/signUpAPI"

export interface IVacation {
  id: number
  destination: string
  description: string
  startDate: Date
  endDate: Date
  price: number
  image: string
  subscribers: number
  isSubscribed: boolean
}

export async function getVacationsByUserIdApi(userId: number) {
  try {
    const { data } = await axios.get(`${url}/vacations?userId=${userId}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    const vacations: Array<IVacation> = data.map((v: any) => {
      return {
        id: v.id,
        destination: v.destination,
        description: v.description,
        startDate: v.startDate,
        endDate: v.endDate,
        price: v.price,
        image: v.image,
        subscribers: v.subscribers,
        isSubscribed: v.isSubscribed,
      }
    })
    return vacations
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
