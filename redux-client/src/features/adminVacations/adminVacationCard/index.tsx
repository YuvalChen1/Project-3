import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { IVacation } from "../../vacations/vacationsAPI";

interface VacationCardProps {
  vacation: IVacation;
  onEdit: Function;
  onDelete: Function;
}

function AdminVacationCard(props: VacationCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card
      className="vacation-card"
      title={props.vacation.destination}
    >
      <p>
        <i className="pi pi-calendar"></i> :
        {new Date(props.vacation.startDate).toLocaleDateString()} -{" "}
        {new Date(props.vacation.endDate).toLocaleDateString()}
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          label={"Edit"}
          icon={"pi pi-file-edit"}
          onClick={() => {
            props.onEdit(props.vacation.id);
          }}
        />
        <Button
          style={{ backgroundColor: "rgb(201, 23, 23)" }}
          type="button"
          label={"Delete"}
          icon={"pi pi-trash"}
          onClick={() => {
            props.onDelete(props.vacation.id);
          }}
        />
      </div>
    </Card>
  );
}

export default AdminVacationCard;
