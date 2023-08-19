import axios from "axios"

const url = "http://localhost:4000"

interface ISignUp {
  email: string
  password: string
  firstName: string
  lastName: string
}

export async function userSignUp(signUpPayload: ISignUp) {
  try {
    const result = await axios.post(`${url}/auth/sign-up`, {
      email: signUpPayload.email,
      password: signUpPayload.password,
      firstName: signUpPayload.firstName,
      lastName: signUpPayload.lastName,
    })
    console.log("my result !!!!!!!!!!!!!!!!", result)

    return result.data // Return the response data
  } catch (error: any) {
    console.log("my result !!!!!!!!!!!!!!!!", error.message)
    console.error("Sign-Up failed:", error)
    throw error // Rethrow the error for the caller to handle
  }
}
