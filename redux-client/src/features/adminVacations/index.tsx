import React, { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Button } from "primereact/button"
import "./adminVacations.css"
import { useNavigate } from "react-router-dom"
import { getVacations } from "../vacations/vacationsSlice"
import { Paginator } from "primereact/paginator"
import Swal from "sweetalert2"
import { deleteVacation } from "./adminVacationsSlice"
import AdminVacationCard from "./adminVacationCard"
import { Toast } from "primereact/toast"
import { ProgressSpinner } from "primereact/progressspinner"

export default function AdminVacations() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const [isLoading, setIsLoading] = useState(false)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const toast = useRef<Toast | null>(null)

  const [first, setFirst] = useState(0)
  const itemsPerPage = 9

  const handlePageChange = (event: any) => {
    setFirst(event.first)
  }

  const paginatedVacations = vacations.slice(first, first + itemsPerPage)

  const handleDelete = async (vacationId: number) => {
    const result = await Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })

    if (result.isConfirmed) {
      try {
        setIsLoading(true)
        const response = await dispatch(deleteVacation(vacationId))
        if (deleteVacation.fulfilled.match(response)) {
          toast.current?.show({
            severity: "success",
            summary: "Vacation Deleted Successfully",
            detail: "Vacation Deleted Successfully",
          })
          await dispatch(getVacations(userId))
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Delete Vacation Failed",
            detail: "Delete Vacation Failed. Please try again.",
          })
          console.error("Edit Vacation Failed:", response)
        }
      } catch (error) {
        console.error("Delete Vacation Failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleEdit = (vacationId: number) => {
    navigate(`/edit-vacation/${vacationId}`)
  }

  const handleGetVacations = async () => {
    try {
      setIsLoading(true)
      const result = await dispatch(getVacations(userId))
      if (!result) throw new Error()
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

  return (
    <div style={{ marginTop: "80px" }}>
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
          {" "}
          <h1 style={{ textAlign: "center" }}>Admin Vacations</h1>
          <Paginator
            first={first}
            rows={itemsPerPage}
            totalRecords={vacations.length}
            onPageChange={handlePageChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <Button
              style={{ width: "270px", height: "50px" }}
              type="button"
              label="Add New Vacation"
              icon="pi pi-plus"
              onClick={() => {
                navigate("/addNewVacation")
              }}
            />
            <Button
              style={{ width: "270px", height: "50px" }}
              type="button"
              label="See Charts"
              icon="pi pi-chart-bar"
              onClick={() => {
                navigate("/vacations-chart")
              }}
            />
          </div>
          <div className="vacation-grid">
            {paginatedVacations.map((v, index) => (
              <AdminVacationCard
                key={index}
                vacation={{
                  ...v,
                  startDate: new Date(v.startDate),
                  endDate: new Date(v.endDate),
                }}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
            <Toast ref={toast} />
          </div>
        </>
      )}
    </div>
  )
}
