import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../ui-components/logo"
import "./account.css"
import ChangePasswordForm from "../changePWForm"
import Modal from "../ui-components/modal"
import { Button } from "primereact/button"
import SideNav from "../ui-components/side-nav"
import LogoutButton from "../ui-components/logout-button"

const AccountPage = () => {
  const navigate = useNavigate()
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)

  const handleShowSideNav = () => {
    setIsSideNavVisible(true)
  }

  const handleHideSideNav = () => {
    setIsSideNavVisible(false)
  }

  const userData = {
    email: JSON.parse(localStorage.getItem("userRecord") as any)?.email,
    username:
      JSON.parse(localStorage.getItem("userRecord") as any)?.firstName +
      " " +
      JSON.parse(localStorage.getItem("userRecord") as any)?.lastName,
  }

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true)
  }

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false)
  }

  return (
    <div className="account-page-container" style={{ marginTop: "150px" }}>
      <header className="header">
        <Logo />
        <h2>Account Information</h2>
        <div style={{ display: "flex" }}>
          <LogoutButton></LogoutButton>
          <div style={{ position: "fixed", left: "97%" }}>
            <Button
              style={{ borderRadius: "30px", backgroundColor: "#55c2da" }}
              icon="pi pi-bars"
              onClick={handleShowSideNav}
            ></Button>
            <SideNav visible={isSideNavVisible} onHide={handleHideSideNav} />
          </div>
        </div>
      </header>

      <div className="user-info">
        <h3>Email: {userData.email}</h3>
        <h3>Full Name: {userData.username}</h3>
      </div>

      <div className="change-password-button">
        <Button onClick={handleChangePassword}>Change Password</Button>
      </div>

      <Link to="/home">Back to Home</Link>

      <Modal isOpen={isChangePasswordOpen} onClose={handleCloseChangePassword}>
        {/* Render the ChangePasswordForm inside the modal */}
        <ChangePasswordForm />
      </Modal>
    </div>
  )
}

export default AccountPage
