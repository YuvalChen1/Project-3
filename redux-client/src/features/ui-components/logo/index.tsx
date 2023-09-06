import { Link } from "react-router-dom"

export default function Logo() {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  }

  return (
    <div
      className="bubbly-text"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <h2 style={{ position: "relative", left: "40px" }}>
        <Link to="/home" style={linkStyle}>
          Trippy{" "}
          <img
            width={80}
            style={{
              mixBlendMode: "multiply",
              marginTop: "5px",
              position: "relative",
              right: "60px",
            }}
            src="/src/assets/images/logo.png"
            alt="logo"
          />
        </Link>
      </h2>
    </div>
  )
}
