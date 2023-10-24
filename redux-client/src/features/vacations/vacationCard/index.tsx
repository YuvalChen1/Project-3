import React, { useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { IVacation } from "../vacationsAPI"
import { url } from "../../sign-up/signUpAPI"

interface VacationCardProps {
  vacation: IVacation
  onSubscribe: Function
  onUnsubscribe: Function
}

function VacationCard(props: VacationCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const isDescriptionLongEnough = props.vacation.description.length > 200

  return (
    <Card className="vacation-card">
      <div className="card-image">
        <img
          src={`${url}${props.vacation.image}`}
          alt={props.vacation.destination}
        />
        <div className="card-title">
          <h3>{props.vacation.destination}</h3>
        </div>
      </div>
      <p style={{ backgroundColor: "turquoise" }}>
        {" "}
        <i className="pi pi-calendar"></i> :
        {new Date(props.vacation.startDate).toLocaleDateString()} -{" "}
        {new Date(props.vacation.endDate).toLocaleDateString()}
      </p>
      <div className="description">
        <p>
          {showFullDescription
            ? props.vacation.description
            : props.vacation.description.substring(0, 200) +
              (props.vacation.description.length > 200 ? "..." : "")}
        </p>
        {isDescriptionLongEnough && (
          <span
            className="description-toggle"
            onClick={toggleDescription}
            style={{ cursor: "pointer" }}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
      <p>
        <strong>Price:</strong> ${props.vacation.price}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{ height: "40px" }}
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

        <p
          style={{
            border: "1px solid black",
            borderRadius: "15px",
            position: "relative",
            bottom: "17px",
            padding: "10px",
          }}
        >
          <strong>Subscribers:</strong> {props.vacation.subscribers}
        </p>
      </div>
    </Card>
  )
}

export default VacationCard
