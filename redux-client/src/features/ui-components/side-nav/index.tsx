import React, { useEffect, useRef, useState } from "react"
import { Sidebar } from "primereact/sidebar"
import { Link } from "react-router-dom"
import { Button } from "primereact/button"
import { loginUser } from "../../login/loginSlice"
import { useAppDispatch } from "../../../app/hooks"
import { Toast } from "primereact/toast"
import LogoutButton from "../logout-button"

interface SideNavProps {
  visible: boolean
  onHide: () => void
}

const SideNav: React.FC<SideNavProps> = ({ visible, onHide }) => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("token")
  const [role, setRole] = useState(null)
  const email = localStorage.getItem("userEmail")
  const password = localStorage.getItem("userPassword")
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<Toast | null>(null)

  const renderNavItem = (path: string, label: string, icon: string) => (
    <div className="nav-item" onClick={onHide}>
      <Link to={path}>
        <Button label={label} icon={icon} className="p-button-text" />
      </Link>
    </div>
  )

  const handleGetUserData = async () => {
    if (token) {
      try {
        setIsLoading(true)
        const result = await dispatch(loginUser({ email, password } as any))
        setRole(result?.payload?.userRecord?.role)
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Get User Data Failed",
          detail: "Get User Data Failed. Something Went Wrong.",
        })
        console.error("Error Get User Data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    handleGetUserData()
  }, [token])

  return (
    <div>
      <Sidebar visible={visible} onHide={onHide}>
        <div className="nav-container">
          {renderNavItem("/home", "Home", "pi pi-home")}
          {renderNavItem("/about", "About", "pi pi-info-circle")}
          {token && renderNavItem("/account", "Account", "pi pi-user")}
          {token &&
            role === "admin" &&
            renderNavItem(
              "/admin-vacations",
              "Admin Vacations",
              "pi pi-file-edit",
            )}
          {token &&
            role === "user" &&
            renderNavItem("/vacations", "Vacations", "pi pi-map-marker")}
        </div>
        <div style={{ marginTop: "50px" }}>
          {token && <LogoutButton></LogoutButton>}
        </div>
      </Sidebar>
      <Toast ref={toast} />
    </div>
  )
}

export default SideNav
