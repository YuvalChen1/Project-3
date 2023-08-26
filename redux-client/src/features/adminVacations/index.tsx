import React, { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Button } from "primereact/button"
import "./adminVacations.css"
import { useNavigate } from "react-router-dom"
import { getVacations } from "../vacations/vacationsSlice"
import { Paginator } from "primereact/paginator"
import { deleteVacation } from "./adminVacationsSlice"
import AdminVacationCard from "./adminVacationCard"
import { Toast } from "primereact/toast"

export default function AdminVacations() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const status = useAppSelector((state) => state.vacations.status)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const toast = useRef<Toast | null>(null)

  const [first, setFirst] = useState(0)
  const itemsPerPage = 9

  const handlePageChange = (event: any) => {
    setFirst(event.first)
  }

  const paginatedVacations = vacations.slice(first, first + itemsPerPage)

  const handleDelete = async (vacationId: number) => {
    try {
      const response = await dispatch(deleteVacation(vacationId))
      if (deleteVacation.fulfilled.match(response)) {
        toast.current?.show({
          severity: "success",
          summary: "Vacation Deleted Successfully",
          detail: "Vacation Deleted Successfully",
        })
        setTimeout(() => {
          dispatch(getVacations(userId))
        }, 1500)
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
    }
  }

  const handleEdit = (vacationId: number) => {
    navigate(`/edit-vacation/${vacationId}`)
  }

  useEffect(() => {
    dispatch(getVacations(userId))
  }, [])

  return (
    <div style={{ marginTop: "80px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Vacations</h1>
      <Paginator
        first={first}
        rows={itemsPerPage}
        totalRecords={vacations.length}
        onPageChange={handlePageChange}
      />
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
      )}
    </div>
  )
}
