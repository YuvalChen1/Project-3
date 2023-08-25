import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { Card } from "primereact/card"
import { Button } from "primereact/button"
import "./adminVacations.css"
import { useNavigate } from "react-router-dom"
import { getVacations } from "../vacations/vacationsSlice"
import { deleteVacation } from "./adminVacationsSlice"

export default function AdminVacations() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id

  // const handleSubscribe = (vacationId: number) => {
  //   dispatch(
  //     addSubscriberToDB({ userId: userId, vacationId: vacationId }),
  //   ).then(() => {
  //     dispatch(getVacations(userId))
  //   })
  // }

  const handleDelete = async (vacationId: number) => {
    try {
      await dispatch(deleteVacation(vacationId))
      dispatch(getVacations(userId))
    } catch (error) {
      console.error("Error unsubscribing from vacation:", error)
    }
  }

  useEffect(() => {
    dispatch(getVacations(userId))
  }, [])

  return (
    <div style={{ marginTop: "80px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Vacations</h1>
      {status !== "loading" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ width: "270px", height: "50px" }}
            type="button"
            label="Add New Vacation"
            icon="pi pi-plus"
            onClick={() => {
              navigate("/addNewVacation")
            }}
          />
        </div>
      )}
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "failed" ? (
        <div>Failed to load vacations.</div>
      ) : (
        <div style={{ marginTop: "50px" }} className="vacation-grid">
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
                  label={"Edit"}
                  icon={"pi pi-file-edit"}
                  onClick={() => {}}
                />
                <Button
                  type="button"
                  label={"Delete"}
                  icon={"pi pi-trash"}
                  onClick={() => {
                    handleDelete(v.id)
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
