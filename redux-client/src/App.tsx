import "./App.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button } from "primereact/button"
import Swal from "sweetalert2"
import Login from "./features/login"
import SignUp from "./features/sign-up"
import Vacations from "./features/vacations"
import ProtectedRoute from "./features/ui-components/protected-route"
import AdminVacations from "./features/adminVacations"
import NewVacation from "./features/addNewVacation"
import EditVacation from "./features/editVactions"
import VacationChart from "./features/charts"
import HomePage from "./features/homePage"
import Logo from "./features/ui-components/logo"
import SideNav from "./features/ui-components/side-nav"
import Footer from "./features/ui-components/footer"

interface IRoute {
  path: string
  key: string
  component: any
  label?: string
  roles?: string[]
}

const routes: Array<IRoute> = [
  {
    path: "/home",
    component: <HomePage />,
    key: "home",
    label: "Home",
  },
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
  {
    path: "/vacations-chart",
    component: (
      <ProtectedRoute>
        <VacationChart />
      </ProtectedRoute>
    ),
    key: "vacationChart",
    label: "Chart",
    roles: ["admin"],
  },
]

function App() {
  const navigate = useNavigate()
  const role = JSON.parse(localStorage.getItem("userRecord") as any)?.role
  const token = localStorage.getItem("token")
  const firstName = JSON.parse(
    localStorage.getItem("userRecord") as any,
  )?.firstName
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isSideNavVisible, setIsSideNavVisible] = useState(false)

  const handleShowSideNav = () => {
    setIsSideNavVisible(true)
  }

  const handleHideSideNav = () => {
    setIsSideNavVisible(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const tokenExpiration = localStorage.getItem("tokenExpiration")

    if (token) {
      const currentTimestamp = new Date().getTime()
      if (tokenExpiration) {
        const expirationTimestamp = parseInt(tokenExpiration, 10)
        if (currentTimestamp < expirationTimestamp) {
          setIsLoggedIn(true)
        } else {
          Swal.fire({
            title: "Session Expiration",
            text: "Your Session Has Expired",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })
          navigate("/login")
        }
      } else {
        Swal.fire({
          title: "Session Expiration",
          text: "Your Session Has Expired",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        })
        navigate("/login")
      }
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
    localStorage.removeItem("tokenExpiration")
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <div className="app-container">
      <div className="header">
        {firstName && isLoggedIn && (
          <div className="welcome-message">
            <h3>Welcome {firstName}</h3>
          </div>
        )}
        <Logo></Logo>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ marginRight: "42px" }}>
            {isLoggedIn && token && (
              <div className="logout-button">
                <Button style={{}} onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            )}
          </div>
          <div style={{ position: "fixed", left: "97%" }}>
            <Button
              style={{ borderRadius: "30px", backgroundColor: "#55c2da" }}
              icon="pi pi-bars"
              onClick={handleShowSideNav}
            ></Button>
            <SideNav visible={isSideNavVisible} onHide={handleHideSideNav} />
          </div>
        </div>
        {/* {routes.map((route) => {
          if (!route.roles || route.roles.includes(role)) {
            return (
              <Link key={route.label} to={route.path}>
                {route.label} |
              </Link>
            )
          }
          return null
        })} */}
      </div>

      <div className="main-content">
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
            <Route path="/" element={<Navigate to="/home" replace />} />
          )}
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
