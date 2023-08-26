import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addSubscriberToDB,
  getVacations,
  removeSubscriberFromDB,
} from "./vacationsSlice"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Paginator } from "primereact/paginator"
import "./Vacations.css"
import Footer from "../ui-components/footer"

export default function Vacations() {
  const dispatch = useAppDispatch()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const [first, setFirst] = useState(0)
  const itemsPerPage = 9

  const handlePageChange = (event: any) => {
    setFirst(event.first)
  }

  const paginatedVacations = vacations.slice(first, first + itemsPerPage)

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
    <div style={{ marginTop: "80px" }}>
      <h1 style={{ textAlign: "center" }}>Vacations</h1>
      <Paginator
        first={first}
        rows={itemsPerPage}
        totalRecords={vacations.length}
        onPageChange={handlePageChange}
      />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "failed" ? (
        <div>Failed to load vacations.</div>
      ) : (
        <div style={{ marginTop: "50px" }} className="vacation-grid">
          {paginatedVacations.map((v, index) => (
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
                  icon={v.isSubscribed ? "pi pi-heart-fill" : "pi pi-heart"}
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
      {/* <Footer></Footer> */}
    </div>
  )
}
