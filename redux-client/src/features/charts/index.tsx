import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Bar } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { getVacations } from "../vacations/vacationsSlice"
import { Button } from "primereact/button"
import { useNavigate } from "react-router"
import { Toast } from "primereact/toast"

export default function VacationChart() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const vacations = useAppSelector((state) => state.vacations.vacation)
  const vacationNames = vacations.map((vacation) => vacation.destination)
  const subscribers = vacations.map((vacation) => vacation.subscribers)

  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<Toast | null>(null)

  const chartData = {
    labels: vacationNames,
    datasets: [
      {
        label: "Subscribers",
        data: subscribers,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const chartRef = useRef<Chart<"bar"> | null>(null)

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

  const generateCSVData = () => {
    const csvContent =
      "Destination,Subscribers\n" +
      vacationNames
        .map((name, index) => `${name},${subscribers[index]}`)
        .join("\n")
    return csvContent
  }

  const downloadCSV = () => {
    const csvData = generateCSVData()
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vacations_data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  useEffect(() => {
    handleGetVacations()

    const canvasElement = document.getElementById(
      "vacation-chart",
    ) as HTMLCanvasElement | null

    console.log(vacations.length)

    if (canvasElement && !isLoading && vacations.length > 1) {
      chartRef.current = new Chart(canvasElement, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      })
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [isLoading])

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Vacations Data</h1>
      <Button
        style={{ marginTop: "20px" }}
        label="Go Back"
        icon="pi pi-arrow-left"
        onClick={() => navigate("/admin-vacations")}
      />
      <Button
        style={{ marginTop: "20px", marginLeft: "10px" }}
        label="Download CSV"
        icon="pi pi-download"
        onClick={downloadCSV}
      />
      <Toast ref={toast} />
      <canvas id="vacation-chart" className="vacation-chart"></canvas>
    </div>
  )
}
