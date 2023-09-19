import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

interface SideNavProps {
  visible: boolean;
  onHide: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ visible, onHide }) => {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("userRecord") as any)?.role;

  const renderNavItem = (path: string, label: string, icon: string) => (
    <div className="nav-item" onClick={onHide}>
      <Link to={path}>
        <Button label={label} icon={icon} className="p-button-text" />
      </Link>
    </div>
  );

  return (
    <div>
      <Sidebar visible={visible} onHide={onHide}>
        <div className="nav-container">
          {renderNavItem("/home", "Home", "pi pi-home")}
          {renderNavItem("/about", "About", "pi pi-info-circle")}
          {token && renderNavItem("/account", "Account", "pi pi-user")}
          {token && role === "admin" && renderNavItem("/admin-vacations", "Admin Vacations", "pi pi-file-edit")}
          {token && renderNavItem("/vacations", "Vacations", "pi pi-map-marker")}
        </div>
      </Sidebar>
    </div>
  );
};

export default SideNav;
