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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const loading = useAppSelector((state) => state.signUp.loading)
  const toast = useRef<Toast | null>(null)

  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password :</label>
              <InputText
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="firstName">First Name :</label>
              <InputText
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="lastName">Last Name :</label>
              <InputText
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              style={{ marginTop: "20px" }}
              label="Sign Up"
              icon="pi pi-check"
              type="submit"
              disabled={loading}
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
