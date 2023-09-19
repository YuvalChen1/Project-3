import axios from "axios"
import { url } from "../sign-up/signUpAPI"

export interface IAddVacation {
  destination: string
  description: string
  startDate: Date
  endDate: Date
  price: number
  image: string
}

export interface IEditVacation extends IAddVacation {
  id: number
}

export async function addNewVacationApi(vacation: IAddVacation) {
  try {
    const response = await axios.post(
      `${url}/vacations/new`,
      {
        destination: vacation.destination,
        description: vacation.description,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        price: vacation.price,
        image: vacation.image,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )

    if (response.status === 200) {
      return { message: "New Vacation Added" }
    } else {
      console.error("API request failed with status:", response.status)
      throw new Error("Adding New Vacation Failed")
    }
  } catch (error) {
    console.error("API request failed with error:", error)
    throw new Error("Adding New Vacation Failed")
  }
}

export async function deleteVacationApi(vacationId: number) {
  try {
    const response = await axios.delete(
      `${url}/vacations/delete?id=${vacationId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )
    return response
  } catch (error) {
    console.error("API request failed with error:", error)
    throw new Error("Delete Vacation Failed")
  }
}

export async function editVacationByIdApi(vacation: IEditVacation) {
  try {
    const response = await axios.put(
      `${url}/vacations/edit`,
      {
        destination: vacation.destination,
        description: vacation.description,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        price: vacation.price,
        image: vacation.image,
        id: vacation.id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )

    if (response.status === 200) {
      return { message: "Vacation Edited Successfully" }
    } else {
      console.error("API request failed with status:", response.status)
      throw new Error("Vacation Edit Failed")
    }
  } catch (error) {
    console.error("API request failed with error:", error)
    throw new Error("Vacation Edit Failed")
  }
}
