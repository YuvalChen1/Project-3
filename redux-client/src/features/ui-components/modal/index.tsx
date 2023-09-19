import React from "react"
import "./modal.css"
import { Button } from "primereact/button"

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Button
          icon="pi pi-times"
          style={{
            position: "relative",
            left: "200px",
            bottom: "7px",
            backgroundColor: "rgb(201, 23, 23)",
          }}
          onClick={onClose}
        ></Button>
        {children}
      </div>
    </div>
  )
}

export default Modal
