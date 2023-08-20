import logo from "./logo.svg"
import "./App.css"
import "primereact/resources/themes/saga-blue/theme.css" // You can choose a different theme if needed
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { Link, Route, Routes } from "react-router-dom"
import { Button } from "primereact/button"

import Login from "./features/login"
import SignUp from "./features/sign-up"

function App() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          textAlign: "right",
        }}
      >
        <Button>Log Out</Button>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Link to="/login">Login</Link>
        <Link to="/signUp">SignUp</Link>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
