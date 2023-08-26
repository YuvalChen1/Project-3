import "./App.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button } from "primereact/button"
import Login from "./features/login"
import SignUp from "./features/sign-up"
import Vacations from "./features/vacations"
import ProtectedRoute from "./features/ui-components/protected-route"
import AdminVacations from "./features/adminVacations"
import NewVacation from "./features/addNewVacation"
import EditVacation from "./features/editVactions"

interface IRoute {
  path: string
  key: string
  component: any
  label?: string
  roles?: string[]
}

const routes: Array<IRoute> = [
  {
    path: "/login",
    component: <Login />,
    key: "login",
    label: "Login",
  },
  {
    path: "/signUp",
    component: <SignUp />,
    key: "sign-up",
    label: "Sign Up",
  },
  {
    path: "/admin-vacations",
    component: (
      <ProtectedRoute>
        <AdminVacations />
      </ProtectedRoute>
    ),
    key: "admin-vacations",
    label: "Admin Vacations",
    roles: ["admin"],
  },
  {
    path: "/vacations",
    component: (
      <ProtectedRoute>
        <Vacations />
      </ProtectedRoute>
    ),
    key: "vacations",
    label: "Vacations",
  },
  {
    path: "/addNewVacation",
    component: (
      <ProtectedRoute>
        <NewVacation />
      </ProtectedRoute>
    ),
    key: "addNewVacation",
    label: "addNewVacation",
    roles: ["admin"],
  },
  {
    path: "/edit-vacation/:id",
    component: (
      <ProtectedRoute>
        <EditVacation />
      </ProtectedRoute>
    ),
    key: "editVacation",
    label: "editVacation",
    roles: ["admin"],
  },
]

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const role = JSON.parse(localStorage.getItem("userRecord") as any)?.role
  const firstName = JSON.parse(
    localStorage.getItem("userRecord") as any,
  )?.firstName
  const isLoggedIn = token

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
    navigate("/login")
  }

  return (
    <div className="app-container">
      {isLoggedIn && (
        <div className="header">
          {firstName && (
            <div className="welcome-message">
              <h3>Welcome {firstName}</h3>
            </div>
          )}
          <div className="logout-button">
            <Button onClick={handleLogout}>Log Out</Button>
          </div>
        </div>
      )}
      <div className="main-content" style={{ marginTop: "50px" }}>
        {/* {routes.map((route) => {
          if (!route.roles || route.roles.includes(role)) {
            return (
              <Link key={route.label} to={route.path}>
                {route.label}
              </Link>
            )
          }
          return null 
        })} */}
        <Routes>
          {routes.map((route) => {
            if (!route.roles || route.roles.includes(role)) {
              return (
                <Route
                  key={route.label}
                  path={route.path}
                  element={route.component}
                />
              )
            }
            return null
          })}
          {!isLoggedIn && (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
