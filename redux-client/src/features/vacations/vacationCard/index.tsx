import React, { useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { IVacation } from "../vacationsAPI"

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

  return (
    <Card
      className="vacation-card"
      // style={{ backgroundColor: "grey", color: "white" }}
      title={props.vacation.destination}
    >
      <p style={{ backgroundColor: "turquoise" }}>
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
      <div className="description" onClick={toggleDescription}>
        {showFullDescription ? (
          <p>{props.vacation.description}</p>
        ) : (
          <p>
            {props.vacation.description.substring(0, 200)}
            {props.vacation.description.length > 200 ? "..." : ""}
          </p>
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
