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
  const firstName = JSON.parse(
    localStorage.getItem("userRecord") as any,
  )?.firstName
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
          // Token has expired, handle it accordingly
          // For example, show a message and navigate to the login page
          Swal.fire({
            title: "Session Expiration",
            text: "Your Session Has Expired",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })

          // alert("Your session has expired")
          navigate("/login")
        }
      } else {
        // Token expiration not found, assume it has expired
        alert("Your session has expired")
        navigate("/login")
      }
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRecord")
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
        <div
          className="bubbly-text "
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <h2 style={{ position: "relative", left: "40px" }}>
            Trippy{" "}
            <img
              width={80}
              style={{
                mixBlendMode: "multiply",
                marginTop: "5px",
                position: "relative",
                right: "60px",
              }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAABTVBMVEX///8fpt7///7//f////38//////v2///5/////f3//fr///rz///8//3v//8hpd8aP3T/+f8bPnYipOL4//r//vUePm//8//p//8dnNUZqdwooOX/+fsjpNwfptsaqdscPXhTbIjV/P+k2Oxur9JTn8Ta9PmeyNs1pM8Tm84SquYTn8RxxdKq0eKz4/Xc8f7u+P698/xtxuar4u7F5fAnm8clpcZJstBsv9WLzN3F7PJosc1Fqs1HpdOGyOL6/+6Z3OnT2dyc1PCqrrPDxsl+utoSqfB/hpcRrtuntslMWnGcn6+Lx+ggMU9uf53O+f8pP1sQQWe4zN0AHlXE2d5MWoOssMB/tM8AJFhClsewr8oAMFcKRosQNF00SWwANHd/nbZUbp3e3OtgqdYAktIgofIBMmNetssAJEcAJ1iGk6EAF1RSX4Z1eoiZnKEZ1cr9AAAIkUlEQVR4nO3a/VfTyBoH8LxNXpukbZKapDQBijVJ11JoC1v6IrgIRVhY0euVVVwvapXdvff///E+k+K5guce2z1rydl9PueIiMjJtzPzzDNTGQYhhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgihvy2OMOTqM/jF84yu3+rzzAunEzIJznHwCc/Iksjd8jPNBY3NccrkM9kW7ZxeuO1nmgtCOFUVBVVl6Jgrom3/bYIzqsoRBaa4JDN3Cqqt87f9THMiqFzOWK6u3L270jAKBe0vVNs47oty9dmXOEGu3YtiM0nY+ncur4jzfbg/nejoUu1+Y7UpMYLjMArPEFlRoGxDMWNUzdEKPLFtZUHJra1Hkcn6o9D36y2J4ZXbfvQvcAJ8INN+t9TudeKgvrH5fbe1VXMlojm6rmuaI0L5hhVt2M5CgbitXuyZJssGpmlZQVdmMrjENU3k6PYzzZBw7X6HTRKvbFkVPwy8wcqwtdWU4GVTVVUQBF1/4KjE3d6sh1a5XPZZ+GjteV3iCFO/tHOj0k2nubMz1Vw0HnpWEoSWRXOV9/Ysy/NiiL+9dmIYRHScBVLrRqHPsjDegW9aZctPvC3REbNW3RQ6y3d+2G1O9+2qU3vkWXt+GIZBEETwgYX6ZQZhFHuDRw9bJ2vDjcgsl80KC98TmPAqjepVA8pA1jo3jpF293/gp12C2gOHtN96lUoQjkajIAWr+IoXx3GFtZIK/XLFNAM2Mb2zqqQUeEbLQnARKhHPK44Mo33w+LCZHiOmQmSeJ8vbEWvtWRVY7TRuEKb5fRh9AJObHYUm/NGyEjbuHNUkTYWfnokRFzjCK4pik+bzH48htiJMX9ZTJ72YBp2MNnsDfM00Ya4HrNcZ1uRvlOEPgfMS7D+y+/ynJ6ea0JQFYbZ/r/BGayOmKzkIw9HN4MAfwTqPo96JKwtqhnZwGXZfRjooPT02iPFsR5o1OKOpTPNhHLB0hofXIsP4+/AlKGqdXluWRU39ssG7PbYtMqf/ePr0OZM7+WdbmnnEoSYoSm6r1wlhkZfNa8GhwkM5t7z1NcPhFI6+yt8iwh/DMavHL4rFU8epntVkmZk5OM/rtq3mtu/G5s3gLK11nc2GxDgOHetPNxKZwP9cWiy9fCYa3bOGqEB9n7W4wSmTVx2NcdfjG6s7De5Vc/aDBwLPCZygapk4n/CCo8qrSx/zr853ZWk97urqbD9AFEVoTWWiqI4jNlubMNmvB6/ANL9PTwBXsygjS5yD/vTZ68X84i+HjDH0vBNtxpoLM1eXbduxdbn5cADtClu5FrxiJt5KLkOFfEJwoKqdl14Vi+M7XDW2TFddmOkHwIFTtHOGI+ZOhoM4gWYdZvbnwcNkr1PL0Kq+wonMwcv8Yv7J+THjBkFyBsFnOjBCTYOiwDTvr3SicORDUWdvBvfuCUr2kpPTy1Kx+OTJ+A1z4rFsp2vM1FlxfIHJLbeGAw86NjMYhRXzWk2HA3hw11UzUc6uWz3PLxbzpdIv/2Kkt17CRsNlwkxdfjiG1BqPogg2ajiSVUzrRmpa3DpbsgztUZZAfSVL50UIXlx89eKCcY86cRhHj9qukf59uuHSexRZ1nURei6Gbti8YNt2erkkue17vY30iiGgB5IADioJlLPO2z5bZgMTjuBJEAwJL+varQa9Bo5fsPR2xqX8IiQHpQtGclvf9yPvnTdYH1bbtVqt2czlJIkospGTiMApsJoVpQBnSsmttbq9Tjw5f8BYwwz3QRDHg6Mt6Tv2PQsHskqSBJvLvJKtiyZOFBTmcJzP05lOP5wfFhgZEq1td9d7/SiK+v1erze8d/+0fVFYmLwLIucM111tDHsbG947GppeJZm+T89k4ahe73fbsmDIH4L3MOJ06sctSRGlLAXnNE3kmf1xkeaG4PDb+Mf902Za6SlJhi2aSJIO3RZElgy3ttWodnv9ej0KWXqV4oejEY1sQnMWdjp3j9qr8I8cRyebQRlOo/BN3jp0qro01f3dvKg0OIx4sUiD0+T5/Hj85PH+z6cXFwUGOmtHb7ZBo7XdPVpZgTkQex5U7yRJ6AXb5I4lCcMYpvdKt7HsQkngaRFQm33fSoObnRPoZKH5z1JZ52kPeTGms/yTxUn48eXHjz8dXkCKZvvo7dm7d+UyTOs9epOYoiM8GnlUEH3oVrdqLv2BOuzpMuELBWU18q10X4urRIHXtyBmrLgJRH5zWVpMq1tpAoZ+8udx6XhXhqOKbdQa94fr/UEUf+IFg8HKerfagMQ5GGZFhT7dUaH1gVIP6YV24Hu03lX6rgNtfKEgZms7A0Q6hP1sMa3q/4s+Mb68XDq4aH7WdEk5SrrZhnHX3jyC89dDK4BuxiyftfVPb4p/+ygzIuRi6QXM9zTuZMA/m/clWPS/7x+ePttpTq4PaL37WvvJiUeT4N4wl8Fe9coCT8jqr69hYV+Fv9rV81efQHsDQ//i6W+/XZZ+//d/dnemuEfg1s3QhEU+WBaUDO1j10ERhq1G2nm+//jlJcQfp7OcJk7L3PgFGL9e2v/1AEY9jax/9XZGfpsGhy1cy25whhE/3YjIO6cHB2/2j5cmjo+P3xwe7O5erDbl9OCipAtVEL66NRmDJIIt/BEcVqdv++eNEE2jQ6go/7cAcYIoKnDupg0rLGDxq8FdjwYf1FSNyNrM15ZzQoguTo4jUJpFUaVvJsBvqihy0NHyPNRoVVQ12K40LX3TR/j6RWStbpbDepWoKiGZeL9kXhob/vvRB+m2H2P+qtDW1Wt3bvsx5m9Yj4Zr8mx3d38J91ouT+zMdanfniEtLKi2fduPMX+6qtn81P+1ACGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGE0Bz9FwF2/TqDbJTyAAAAAElFTkSuQmCC"
              alt="logo"
            />
          </h2>
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
        {isLoggedIn && (
          <div className="logout-button">
            <Button onClick={handleLogout}>Log Out</Button>
          </div>
        )}
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
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
