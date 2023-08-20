import React, { useState } from "react"
import { loginUser } from "./loginSlice"
import { useAppDispatch } from "../../app/hooks"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Messages } from "primereact/messages"
import "./login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
  }

  return (
    <div
      className="p-d-flex p-jc-center p-ai-center login-container">
      <Card className="login-form" title="Login" style={{ width: "350px" }}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="email">Email :</label>
            <InputText
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "15px" }} className="p-field">
            <label htmlFor="password">Password :</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            style={{ marginTop: "20px" }}
            label="Login"
            icon="pi pi-sign-in"
            onClick={handleLogin}
          />
        </div>
      </Card>
    </div>
  )
}

export default Login
