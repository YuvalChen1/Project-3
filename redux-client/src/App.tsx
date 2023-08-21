import logo from "./logo.svg"
import "./App.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { Button } from "primereact/button"

import Login from "./features/login"
import SignUp from "./features/sign-up"
import Vacations from "./features/vacations"
import ProtectedRoute from "./features/ui-components/protected-route"

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const isLoggedIn = token

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      {isLoggedIn && (
        <div
          style={{
            width: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            textAlign: "right",
          }}
        >
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      )}
      <div style={{ marginTop: "50px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/vacations"
            element={
              <ProtectedRoute>
                <Vacations />
              </ProtectedRoute>
            }
          />
          {!isLoggedIn && (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
