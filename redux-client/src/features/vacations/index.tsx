import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addSubscriberToDB,
  getVacations,
  removeSubscriberFromDB,
} from "./vacationsSlice"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import "./Vacations.css"

export default function Vacations() {
  const dispatch = useAppDispatch()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userIdString = localStorage.getItem("userId")
  const userId = Number(userIdString)

  const handleSubscribe = (vacationId: number) => {
    dispatch(
      addSubscriberToDB({ userId: userId, vacationId: vacationId }),
    ).then(() => {
      dispatch(getVacations(userId))
    })
  }

  const handleUnsubscribe = async (vacationId: number) => {
    try {
      await dispatch(
        removeSubscriberFromDB({ userId: userId, vacationId: vacationId }),
      )
      dispatch(getVacations(userId))
    } catch (error) {
      console.error("Error unsubscribing from vacation:", error)
    }
  }

  useEffect(() => {
    dispatch(getVacations(userId))
  }, [])

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
                  <strong>Subscribers:</strong>
                  {v.subscribers}
                </p>
                <Button
                  type="button"
                  label={v.isSubscribed ? "Unsubscribe" : "Subscribe"}
                  icon={v.isSubscribed ? "pi pi-times" : "pi pi-heart"}
                  onClick={() => {
                    if (v.isSubscribed) {
                      handleUnsubscribe(v.id)
                    } else {
                      handleSubscribe(v.id)
                    }
                  }}
                />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
