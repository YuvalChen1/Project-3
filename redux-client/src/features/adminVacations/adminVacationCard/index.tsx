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
    <div className="vacation-card">
      <Card title={props.vacation.destination}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            width={"400px"}
            height={"250px"}
            src={props.vacation.image}
            alt={props.vacation.destination}
          />
        </div>
        <p>
          <strong>Destination:</strong> {props.vacation.destination}
        </p>
        <p>
          <strong>Description:</strong> {props.vacation.description}
        </p>
        <p>
          <strong>Price:</strong> ${props.vacation.price}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(props.vacation.startDate).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(props.vacation.endDate).toLocaleString()}
        </p>
        <p>
          <strong>Subscribers:</strong> {props.vacation.subscribers}
        </p>
        <Button
          type="button"
          label={"Edit"}
          icon={"pi pi-file-edit"}
          onClick={() => {
            props.onEdit(props.vacation.id)
          }}
        />
        <Button
          type="button"
          label={"Delete"}
          icon={"pi pi-trash"}
          onClick={() => {
            props.onDelete(props.vacation.id)
          }}
        />
      </Card>
    </div>
  )
}

export default AdminVacationCard
