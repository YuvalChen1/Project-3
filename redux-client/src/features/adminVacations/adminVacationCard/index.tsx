import React from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { IVacation } from "../../vacations/vacationsAPI"

interface VacationCardProps {
  vacation: IVacation
  onEdit: Function
  onDelete: Function
}

function AdminVacationCard(props: VacationCardProps) {
  return (
    <Card
      className="vacation-card"
      // style={{ backgroundColor: "grey", color: "white" }}
      title={props.vacation.destination}
    >
      <p>
        {" "}
        <i className="pi pi-calendar"></i> :
        {new Date(props.vacation.startDate).toLocaleDateString()} -{" "}
        {new Date(props.vacation.endDate).toLocaleDateString()}
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <h3 className="vacation-title">{props.vacation.destination}</h3> */}
        <img
          style={{ borderRadius: "15px" }}
          width={"400px"}
          height={"250px"}
          src={props.vacation.image}
          alt={props.vacation.destination}
        />
      </div>
      <div className="description">
        <p>{props.vacation.description}</p>
      </div>
      <p>
        <strong>Price:</strong> ${props.vacation.price}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          label={"Edit"}
          icon={"pi pi-file-edit"}
          onClick={() => {
            props.onEdit(props.vacation.id)
          }}
        />
        <Button
          style={{ backgroundColor: "rgb(201, 23, 23)" }}
          type="button"
          label={"Delete"}
          icon={"pi pi-trash"}
          onClick={() => {
            props.onDelete(props.vacation.id)
          }}
        />
      </div>
    </Card>
  )
}

export default AdminVacationCard
