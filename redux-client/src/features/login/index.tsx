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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.login.loading)

  const toast = useRef<Toast | null>(null)

  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
  }, [])

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
        const response = await dispatch(loginUser({ email, password }))
        if (loginUser.fulfilled.match(response)) {
          localStorage.setItem("token", response.payload.token)
          localStorage.setItem(
            "userRecord",
            JSON.stringify(response.payload.userRecord),
          )
          const role = JSON.parse(
            localStorage.getItem("userRecord") as any,
          )?.role
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
        console.error("Login failed:", error)
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
            disabled={loading}
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
