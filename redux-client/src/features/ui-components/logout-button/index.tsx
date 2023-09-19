import React from "react"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
    localStorage.removeItem("tokenExpiration")
    navigate("/login")
  }

  return (
    <div style={{ marginRight: "42px" }} className="logout-button">
      <Button style={{}} onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}

export default LogoutButton
