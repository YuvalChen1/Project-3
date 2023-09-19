import React from "react"
import { Sidebar } from "primereact/sidebar"

interface SideNavProps {
  visible: boolean
  onHide: () => void
}

const SideNav: React.FC<SideNavProps> = ({ visible, onHide }) => {
  return (
    <div>
      <Sidebar visible={visible} onHide={onHide}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {/* Add more menu items */}
        </ul>
      </Sidebar>
    </div>
  )
}

export default SideNav
