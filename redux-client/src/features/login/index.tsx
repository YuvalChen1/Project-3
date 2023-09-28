import React, { useState, useRef, useEffect } from "react"
import { loginUser } from "./loginSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Toast } from "primereact/toast"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const toast = useRef<Toast | null>(null)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setEmailValid(validateEmail(value))
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordValid(value.length >= 4)
  }

  const handleLogin = async () => {
    if (emailValid && passwordValid) {
      try {
        setIsLoading(true)
        const response = await dispatch(loginUser({ email, password }))
        const userRecord = response?.payload?.userRecord
        if (loginUser.fulfilled.match(response)) {
          localStorage.setItem("token", response.payload.token)
          localStorage.setItem(
            "tokenExpiration",
            response.payload.tokenExpiration,
          )
          localStorage.setItem("userEmail", email)
          localStorage.setItem("userPassword", password)
          localStorage.setItem("firstName", userRecord?.firstName)
          localStorage.setItem("lastName", userRecord?.lastName)
          const role = userRecord?.role
          if (role === "admin") {
            navigate("/admin-vacations")
          } else {
            navigate("/vacations")
          }
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Login Failed",
            detail: "Login failed. Please try again.",
          })
          console.error("Login failed:", response.payload)
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Login Failed",
          detail: "Login failed. Please try again.",
        })
        console.error("Login failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  return (
    <div className="p-d-flex p-jc-center p-ai-center login-container">
      <Card className="login-form" title="Login" style={{ width: "350px" }}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="email">Email :</label>
            <InputText
              id="email"
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={!emailValid ? "p-invalid" : ""}
            />
            {!emailValid && (
              <small className="p-error">Invalid email address.</small>
            )}
          </div>
          <div style={{ marginTop: "15px" }} className="p-field">
            <label htmlFor="password">Password :</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={!passwordValid ? "p-invalid" : ""}
            />
            {!passwordValid && (
              <small className="p-error">
                Password must be at least 4 characters long.
              </small>
            )}
          </div>
          <Button
            style={{ marginTop: "20px" }}
            label="Login"
            icon="pi pi-sign-in"
            onClick={handleLogin}
            disabled={isLoading}
          />
        </div>
        <p style={{ marginTop: "50px", textAlign: "center" }}>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </Card>
      <Toast ref={toast} />
    </div>
  )
}

export default Login
