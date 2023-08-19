import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import Login from "./features/login"
import SignUp from "./features/sign-up"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login></Login>
        <SignUp></SignUp>
      </header>
    </div>
  )
}

export default App
