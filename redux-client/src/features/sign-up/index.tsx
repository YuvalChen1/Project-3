import React, { useState, useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Toast } from "primereact/toast"
import { signUpUser } from "./signUpSlice"
import { Link, useNavigate } from "react-router-dom"
import "./SignUp.css"

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useRef<Toast | null>(null)

  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
    localStorage.removeItem("tokenExpiration")
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setEmailValid(validateEmail(value))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setPasswordValid(value.length >= 4)
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFirstName(value)
    setFirstNameValid(value.length >= 2)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLastName(value)
    setLastNameValid(value.length >= 2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      if (emailValid && passwordValid && firstNameValid && lastNameValid) {
        const formData = { email, password, firstName, lastName }
        const responseAction = await dispatch(signUpUser(formData))

        if (signUpUser.fulfilled.match(responseAction)) {
          toast.current?.show({
            severity: "success",
            summary: "Sign Up Successful",
            detail: "You have successfully signed up!",
          })
          setTimeout(() => {
            navigate("/login")
          }, 1500)
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Sign Up Failed",
            detail: "Sign up failed. Please try again.",
          })
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  return (
    <div className="signup-container">
      <Card className="signup-form" title="Sign Up" style={{ width: "350px" }}>
        <div className="p-fluid">
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <label htmlFor="email">Email :</label>
              <InputText
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
                required
                className={!emailValid ? "p-invalid" : ""}
              />
              {!emailValid && (
                <small className="p-error">Invalid email address.</small>
              )}
            </div>
            <div className="p-field">
              <label htmlFor="password">Password :</label>
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={!passwordValid ? "p-invalid" : ""}
              />
              {!passwordValid && (
                <small className="p-error">
                  Password must be at least 4 characters long.
                </small>
              )}
            </div>
            <div className="p-field">
              <label htmlFor="firstName">First Name :</label>
              <InputText
                id="firstName"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                className={!firstNameValid ? "p-invalid" : ""}
              />
              {!firstNameValid && (
                <small className="p-error">
                  First name must be at least 2 characters long.
                </small>
              )}
            </div>
            <div className="p-field">
              <label htmlFor="lastName">Last Name :</label>
              <InputText
                id="lastName"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                required
                className={!lastNameValid ? "p-invalid" : ""}
              />
              {!lastNameValid && (
                <small className="p-error">
                  Last name must be at least 2 characters long.
                </small>
              )}
            </div>
            <Button
              style={{ marginTop: "20px" }}
              label="Sign Up"
              icon="pi pi-check"
              type="submit"
              disabled={isLoading}
            />
            <p style={{ marginTop: "50px", textAlign: "center" }}>
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </Card>
      <Toast ref={toast} />
    </div>
  )
}

export default SignUp
