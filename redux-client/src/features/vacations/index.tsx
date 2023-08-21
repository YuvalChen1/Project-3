import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { IFollower, addSubscriberToDB, getVacations } from "./vacationsSlice"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import "./Vacations.css" // Import a CSS file for styling
import { vacationSubscribe } from "./vacationsSlice"

export default function Vacations() {
  const dispatch = useAppDispatch()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userIdString = localStorage.getItem("userId")
  const userId = Number(userIdString)

  useEffect(() => {
    dispatch(getVacations())
    console.log(userId)
    console.log(typeof userId)
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
                <Button
                  label="Subscribe"
                  icon="pi pi-heart"
                  onClick={() =>
                    dispatch(
                      addSubscriberToDB({ userId: userId, vacationId: v.id }),
                    )
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
