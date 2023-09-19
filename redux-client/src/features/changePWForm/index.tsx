import React, { useState } from "react"
import "./changePw.css"
import { passwordChange } from "../accountPage/accountApi"
import Swal from "sweetalert2"
import { Button } from "primereact/button"
import { getHashedPassword } from "./hashedPassword"
import { useNavigate } from "react-router-dom"

const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const userPassword = JSON.parse(
    localStorage.getItem("userRecord") as any,
  )?.password
  const userSalt = JSON.parse(localStorage.getItem("userRecord") as any)?.salt
  const [formVisible, setFormVisible] = useState(true)
  const [passwordChanged, setPasswordChanged] = useState(false)

  const [currentPasswordValid, setCurrentPasswordValid] = useState(true)
  const [currentPasswordValidate, setCurrentPasswordValidate] = useState(true)
  const [newPasswordValid, setNewPasswordValid] = useState(true)
  const [newPasswordValidate, setNewPasswordValidate] = useState(true)
  const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState(true)

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()

      const enteredPasswordHash = await getHashedPassword(
        currentPassword,
        userSalt,
      )

      if (enteredPasswordHash.password !== userPassword) {
        setCurrentPasswordValidate(false)
        return
      }

      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setCurrentPasswordValid(!!currentPassword)
        setNewPasswordValid(!!newPassword)
        setConfirmNewPasswordValid(!!confirmNewPassword)
        return
      }

      if (currentPassword === newPassword) {
        setNewPasswordValidate(false)
        return
      }

      if (newPassword !== confirmNewPassword) {
        setNewPasswordValid(false)
        setConfirmNewPasswordValid(false)
        return
      }

      const result = await passwordChange(newPassword, userId)

      if (!result) {
        throw new Error()
      }

      Swal.fire({
        title: "Password Changed",
        text: "Your password has been changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
          localStorage.removeItem("token")
          localStorage.removeItem("userRecord")
          localStorage.removeItem("tokenExpiration")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return formVisible ? (
    <div className="change-password-form">
      <form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value)
              setCurrentPasswordValid(!!e.target.value)
              setCurrentPasswordValidate(true)
            }}
            className={!currentPasswordValid ? "p-invalid" : ""}
          />
          {!currentPasswordValid && (
            <small className="p-error">Current Password is required.</small>
          )}
          {!currentPasswordValidate && currentPasswordValid && (
            <small className="p-error">Current Password is incorrect.</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              setNewPasswordValid(!!e.target.value)
            }}
            className={!newPasswordValid ? "p-invalid" : ""}
          />
          {!newPasswordValid && (
            <small className="p-error">New Password is required.</small>
          )}
           {!newPasswordValidate && (
            <small className="p-error">New Password Must Be Different</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value)
              setConfirmNewPasswordValid(!!e.target.value)
            }}
            className={!confirmNewPasswordValid ? "p-invalid" : ""}
          />
          {!confirmNewPasswordValid && (
            <small className="p-error">Confirm New Password is required.</small>
          )}
        </div>
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  ) : passwordChanged ? (
    <div className="password-changed">
      <p>Password changed successfully!</p>
    </div>
  ) : null
}

export default ChangePasswordForm
