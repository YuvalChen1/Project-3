import React, { useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { IVacation } from "../../vacations/vacationsAPI"
import { url } from "../../sign-up/signUpAPI"
import Image from "../../ui-components/image"

interface VacationCardProps {
  vacation: IVacation
  onEdit: Function
  onDelete: Function
}

function AdminVacationCard(props: VacationCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "/src/assets/images/error-img.png"
  }

  const isDescriptionLongEnough = props.vacation.description.length > 200

  return (
    <Card className="vacation-card">
      <div className="card-image">
        <img
          src={`${url}${props.vacation.image}`}
          alt={props.vacation.destination}
          onError={handleImageError}
        />
        {/* <Image
          src={`${url}${props.vacation.image}`}
          alt={props.vacation.destination}
          errorSrc="/src/assets/images/error-img.png"
        ></Image> */}
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
