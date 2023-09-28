import React from "react"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import clearLocalStorage from "../../functions/localStorageClear"

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearLocalStorage()
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
