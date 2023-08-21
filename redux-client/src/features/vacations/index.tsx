import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getVacations } from "./vacationsSlice"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import "./Vacations.css" // Import a CSS file for styling
import { vacationSubscribe } from "./vacationsSlice"

export default function Vacations() {
  const dispatch = useAppDispatch()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)

  useEffect(() => {
    dispatch(getVacations())
  }, [dispatch])

  return (
    <div>
      <h1>Vacations</h1>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "failed" ? (
        <div>Failed to load vacations.</div>
      ) : (
        <div className="vacation-grid">
          {vacations.map((v, index) => (
            <div className="vacation-card" key={index}>
              <Card title={v.destination}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    width={"400px"}
                    height={"250px"}
                    src={v.image}
                    alt={v.destination}
                  />
                </div>
                <p>{v.description}</p>
                <p>
                  <strong>Price:</strong> ${v.price}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(v.startDate).toLocaleString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(v.endDate).toLocaleString()}
                </p>
                <p>
                  <strong>Are you Subscribed:</strong>{" "}
                  {v.isSubscribed ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Number of Subscribers:</strong>{" "}
                  {v.numberOfSubscribers}
                </p>
                <Button
                  label="Subscribe"
                  icon="pi pi-heart"
                  onClick={() => dispatch(vacationSubscribe(v.id))}
                />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
