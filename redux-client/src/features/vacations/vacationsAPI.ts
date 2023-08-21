import axios from "axios"
import { url } from "../sign-up/signUpAPI"

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
