import React, { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addSubscriberToDB,
  getVacations,
  removeSubscriberFromDB,
} from "./vacationsSlice"
import { Paginator } from "primereact/paginator"
import { Checkbox } from "primereact/checkbox"
import { ProgressSpinner } from "primereact/progressspinner"
import { ProgressBar } from "primereact/ProgressBar"
import "./Vacations.css"
import Footer from "../ui-components/footer"
import VacationCard from "./vacationCard"
import { Toast } from "primereact/toast"

export default function Vacations() {
  const dispatch = useAppDispatch()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const [first, setFirst] = useState(0)
  const [showSubscribed, setShowSubscribed] = useState(false)
  const [showFuture, setShowFuture] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<Toast | null>(null)
  const itemsPerPage = 9

  const handlePageChange = (event: any) => {
    setFirst(event.first)
  }

  const paginatedVacations = vacations.slice(first, first + itemsPerPage)

  const handleSubscribe = async (vacationId: number) => {
    try {
      setIsLoading(true)
      await dispatch(
        addSubscriberToDB({ userId: userId, vacationId: vacationId }),
      )
      await dispatch(getVacations(userId))
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Unsubscribe Failed",
        detail: "Unsubscribe Failed. Please Contact Admin.",
      })
      console.error("Error unsubscribing from vacation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnsubscribe = async (vacationId: number) => {
    try {
      setIsLoading(true)
      await dispatch(
        removeSubscriberFromDB({ userId: userId, vacationId: vacationId }),
      )
      await dispatch(getVacations(userId))
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Unsubscribe Failed",
        detail: "Unsubscribe Failed. Please Contact Admin.",
      })
      console.error("Error unsubscribing from vacation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetVacations = async () => {
    try {
      setIsLoading(true)
      await dispatch(getVacations(userId))
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Get Vacations Failed",
        detail: "Get Vacations Failed. Please Contact Admin.",
      })
      console.error("Error get vacations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetVacations()
  }, [])

  const handleSubscribeCheckboxChange = () => {
    setShowSubscribed(!showSubscribed)
  }

  const handleUnStartedCheckboxChange = () => {
    setShowFuture(!showFuture)
  }
  const subscribedVacations = showSubscribed
    ? paginatedVacations.filter((v) => v.isSubscribed)
    : paginatedVacations

  const futureVacations = showFuture
    ? subscribedVacations.filter((v) => new Date(v.startDate) > new Date())
    : subscribedVacations

  return (
    <div style={{ marginTop: "150px" }}>
      {isLoading && (
        <div>
          {" "}
          <ProgressSpinner aria-label="Loading" /> loading...
        </div>
      )}
      {status === "failed" ? (
        <div>Failed to load vacations.</div>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Vacations</h1>
          <Paginator
            first={first}
            rows={itemsPerPage}
            totalRecords={vacations.length}
            onPageChange={handlePageChange}
          />
          <div style={{ marginTop: "30px", display: "flex", gap: "40px" }}>
            <h4>
              ~Show Subscribed Vacations
              <Checkbox
                style={{ color: "black" }}
                checked={showSubscribed}
                onChange={handleSubscribeCheckboxChange}
              ></Checkbox>
            </h4>
            <h4>
              ~Show Future Vacations
              <Checkbox
                style={{ color: "black" }}
                checked={showFuture}
                onChange={handleUnStartedCheckboxChange}
              ></Checkbox>
            </h4>
          </div>
          <div className="vacation-grid" style={{ marginBottom: "150px" }}>
            {futureVacations.map((v, index) => (
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
          <Toast ref={toast} />
        </>
      )}
    </div>
  )
}
