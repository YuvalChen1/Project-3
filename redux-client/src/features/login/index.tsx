import React, { useState } from "react"
import { loginUser } from "./loginSlice" // Import the thunk action
import { useAppDispatch } from "../../app/hooks"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    // Dispatch the loginUser thunk action with the username and password
    dispatch(loginUser({ email, password }))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
