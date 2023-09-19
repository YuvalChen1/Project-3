import axios from "axios"
import { url } from "../sign-up/signUpAPI"

export async function passwordChange(password: string, userId: number) {
  try {
    const response = await axios.put(
      `${url}/user/pw-change`,
      {
        password,
        userId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )

    if (response.status === 200) {
      return { message: "Password Has Changed Successfully" }
    } else {
      console.error("API request failed with status:", response.status)
      throw new Error("Password Change Failed")
    }
  } catch (error) {
    console.error("API request failed with error:", error)
    throw new Error("Password Change Failed")
  }
}
