import React, { useEffect, useRef, useState } from "react"
import "./changePw.css"
import { passwordChange } from "../accountPage/accountApi"
import Swal from "sweetalert2"
import { Button } from "primereact/button"
import { getHashedPassword } from "./hashedPassword"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../login/loginSlice"
import { useAppDispatch } from "../../app/hooks"
import { Toast } from "primereact/toast"
import clearLocalStorage from "../functions/localStorageClear"

const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [userId, setUserId] = useState(0)
  const password = localStorage.getItem("userPassword")
  const email = localStorage.getItem("userEmail")
  const token = localStorage.getItem("token")
  const toast = useRef<Toast | null>(null)
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

      if (currentPassword !== password) {
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
      console.log(userId)

      await passwordChange(newPassword, userId)

      Swal.fire({
        title: "Password Changed",
        text: "Your password has been changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          clearLocalStorage()
          navigate("/login")
        }
      })
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Failed To Change Password",
        detail: "Failed To Change Password. Something Went Wrong.",
      })
      console.log(error)
    }
  }

  const handleGetUserData = async () => {
    if (token) {
      try {
        const result = await dispatch(loginUser({ email, password } as any))
        setUserId(result?.payload?.userRecord?.id)
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Get User Data Failed",
          detail: "Get User Data Failed. Something Went Wrong.",
        })
        console.error("Error Get User Data:", error)
      }
    }
  }

  useEffect(() => {
    handleGetUserData()
  }, [token])

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
        <Toast ref={toast} />
      </form>
    </div>
  ) : passwordChanged ? (
    <div className="password-changed">
      <p>Password changed successfully!</p>
    </div>
  ) : null
}

export default ChangePasswordForm
