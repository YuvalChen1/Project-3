import React, { useState, useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Toast } from "primereact/toast"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./edit.css"
import { editVacation } from "../adminVacations/adminVacationsSlice"
import { getVacations } from "../vacations/vacationsSlice"

function EditVacation() {
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const { id } = useParams()
  const vacationId = Number(id)
  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id

  useEffect(() => {
    dispatch(getVacations(userId))
  }, [])

  const initVacation = vacations.find((v) => {
    return v.id === vacationId
  })

  const [destination, setDestination] = useState(initVacation?.destination)
  const [description, setDescription] = useState(initVacation?.description)
  const [startDate, setStartDate] = useState<Date | null>(
    initVacation?.startDate ? new Date(initVacation.startDate) : null,
  )
  const [endDate, setEndDate] = useState<Date | null>(
    initVacation?.endDate ? new Date(initVacation.endDate) : null,
  )
  const [price, setPrice] = useState<number | null>(initVacation?.price || null)
  const [image, setImage] = useState(initVacation?.image)

  const [destinationValid, setDestinationValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [startDateValid, setStartDateValid] = useState(true)
  const [endDateValid, setEndDateValid] = useState(true)
  const [endDateValidation, setEndDateValidation] = useState(true)
  const [priceValid, setPriceValid] = useState(true)
  const [imageValid, setImageValid] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.login.loading)
  const toast = useRef<Toast | null>(null)

  const handleEditVacation = async () => {
    if (
      !destination ||
      !description ||
      !startDate ||
      !endDate ||
      price === null ||
      !image
    ) {
      setDestinationValid(!!destination)
      setDescriptionValid(!!description)
      setStartDateValid(!!startDate)
      setEndDateValid(!!endDate)
      setPriceValid(price !== null)
      setImageValid(!!image)
      return
    }

    if (endDate < startDate) {
      setEndDateValidation(false)
      return
    }

    const vacationPayload = {
      destination,
      description,
      startDate,
      endDate,
      price,
      image,
      id: vacationId,
    }
    try {
      const response = await dispatch(editVacation(vacationPayload))
      if (editVacation.fulfilled.match(response)) {
        toast.current?.show({
          severity: "success",
          summary: "Vacation Edited Successfully",
          detail: "Vacation Edited Successfully",
        })
        setTimeout(() => {
          navigate("/admin-vacations")
        }, 1500)
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Edit Vacation Failed",
          detail: "Edit Vacation Failed. Please try again.",
        })
        console.error("Edit Vacation Failed:", response)
      }
    } catch (error) {
      console.error("Edit Vacation Failed:", error)
    }
  }

  return (
    <div
      style={{ marginTop: "50px" }}
      className="p-d-flex p-jc-center p-ai-center vacation-container"
    >
      <Card
        className="vacation-form"
        title="Edit Vacation"
        style={{ width: "350px" }}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="destination">Destination :</label>
            <InputText
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                setDestinationValid(!!e.target.value)
              }}
              className={!destinationValid ? "p-invalid" : ""}
            />
            {!destinationValid && (
              <small className="p-error">Destination is required.</small>
            )}
          </div>
          <div style={{ marginTop: "15px" }} className="p-field">
            <label htmlFor="description">Description :</label>
            <InputText
              id="description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setDescriptionValid(!!e.target.value)
              }}
              className={!descriptionValid ? "p-invalid" : ""}
            />
            {!descriptionValid && (
              <small className="p-error">Description is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="startDate">Start Date :</label>
            <InputText
              id="startDate"
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const dateValue = new Date(e.target.value)
                setStartDate(dateValue)
                setStartDateValid(!!dateValue)
              }}
              className={!startDateValid ? "p-invalid" : ""}
            />
            {!startDateValid && (
              <small className="p-error">Start Date is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="endDate">End Date :</label>
            <InputText
              id="endDate"
              type="date"
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const dateValue = new Date(e.target.value)
                setEndDate(dateValue)
                setEndDateValid(!!dateValue)
              }}
              className={!endDateValid ? "p-invalid" : ""}
            />
            {!endDateValid && (
              <small className="p-error">End Date is required.</small>
            )}
            {!endDateValidation && (
              <small className="p-error">
                End Date Must Be After Start Date.
              </small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="price">Price :</label>
            <InputText
              id="price"
              type="text"
              value={price !== null ? price?.toString() : ""}
              onChange={(e) => {
                const priceValue = Number(e.target.value)
                setPrice(priceValue)
                setPriceValid(!isNaN(priceValue) && priceValue >= 0)
              }}
              className={!priceValid ? "p-invalid" : ""}
            />
            {!priceValid && (
              <small className="p-error">
                Price is required and must be a non-negative number.
              </small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="image">Image :</label>
            <InputText
              id="image"
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value)
                setImageValid(!!e.target.value)
              }}
              className={!imageValid ? "p-invalid" : ""}
            />
            {!imageValid && (
              <small className="p-error">Image URL is required.</small>
            )}
          </div>
          <Button
            style={{ marginTop: "20px" }}
            label="Edit Vacation"
            icon="pi pi-file-edit"
            onClick={handleEditVacation}
            disabled={loading}
          />
          <Button
            style={{ marginTop: "20px" }}
            label="Go Back"
            icon="pi pi-arrow-left"
            onClick={() => navigate("/admin-vacations")}
            disabled={loading}
          />
        </div>
      </Card>
      <Toast ref={toast} />
    </div>
  )
}

export default EditVacation
