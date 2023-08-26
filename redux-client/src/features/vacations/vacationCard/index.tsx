import React from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { IVacation } from "../vacationsAPI"

interface VacationCardProps {
  vacation: IVacation
  onSubscribe: Function
  onUnsubscribe: Function
}

function VacationCard(props: VacationCardProps) {
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
          label={props.vacation.isSubscribed ? "Unsubscribe" : "Subscribe"}
          icon={
            props.vacation.isSubscribed ? "pi pi-heart-fill" : "pi pi-heart"
          }
          onClick={() => {
            if (props.vacation.isSubscribed) {
              props.onUnsubscribe(props.vacation.id)
            } else {
              props.onSubscribe(props.vacation.id)
            }
          }}
        />
      </Card>
    </div>
  )
}

export default VacationCard
