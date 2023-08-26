import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addSubscriberToDB,
  getVacations,
  removeSubscriberFromDB,
} from "./vacationsSlice"
import { Paginator } from "primereact/paginator"
import "./Vacations.css"
import Footer from "../ui-components/footer"
import VacationCard from "./vacationCard"

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
            <VacationCard
              key={index}
              vacation={{
                ...v,
                startDate: new Date(v.startDate),
                endDate: new Date(v.endDate),
              }}
              onSubscribe={handleSubscribe}
              onUnsubscribe={handleUnsubscribe}
            />
          ))}
        </div>
      )}
      {/* <Footer></Footer> */}
    </div>
  )
}
