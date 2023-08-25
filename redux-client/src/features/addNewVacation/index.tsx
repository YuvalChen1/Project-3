import React, { useState, useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Toast } from "primereact/toast"
import { Link, useNavigate } from "react-router-dom"
import "./newVacation.css"
import { addNewVacation } from "../adminVacations/adminVacationsSlice"

function NewVacation() {
  const [destination, setDestination] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [image, setImage] = useState("")

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

  const handleAddVacation = async () => {
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
    }
    try {
      const response = await dispatch(addNewVacation(vacationPayload))
      if (addNewVacation.fulfilled.match(response)) {
        toast.current?.show({
          severity: "success",
          summary: "New Vacation Added",
          detail: "New Vacation Added",
        })
        setTimeout(() => {
          navigate("/admin-vacations")
        }, 1500)
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Adding New Vacation Failed",
          detail: "Adding New Vacation Failed. Please try again.",
        })
        console.error("Adding New Vacation Failed:", response)
      }
    } catch (error) {
      console.error("Adding New Vacation Failed:", error)
    }
  }

  return (
    <div
      style={{ marginTop: "50px" }}
      className="p-d-flex p-jc-center p-ai-center vacation-container"
    >
      <Card
        className="vacation-form"
        title="New Vacation"
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
            label="Add New Vacation"
            icon="pi pi-plus"
            onClick={handleAddVacation}
            disabled={loading}
          />
        </div>
      </Card>
      <Toast ref={toast} />
    </div>
  )
}

export default NewVacation
