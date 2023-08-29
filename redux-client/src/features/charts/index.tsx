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
  console.log(vacations)

  const userId = JSON.parse(localStorage.getItem("userRecord") as any)?.id
  const vacationNames = vacations.map((vacation) => vacation.destination)
  const subscribers = vacations.map((vacation) => vacation.subscribers)
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

  useEffect(() => {
    const canvasElement = document.getElementById(
      "vacation-chart",
    ) as HTMLCanvasElement | null

    if (canvasElement) {
      chartRef.current = new Chart(canvasElement, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      })
    }
    handleGetVacations()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [dispatch, userId])

  return (
    <div>
      <Button
        style={{ marginTop: "20px" }}
        label="Go Back"
        icon="pi pi-arrow-left"
        onClick={() => navigate("/admin-vacations")}
      />
      <Toast ref={toast} />
      <canvas id="vacation-chart" className="vacation-chart"></canvas>
    </div>
  )
}
