import React, { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../ui-components/logo"
import { Button } from "primereact/button"
import "./about.css"
import LogoutButton from "../ui-components/logout-button"
import SideNav from "../ui-components/side-nav"

const AboutPage = () => {
  const token = localStorage.getItem("token")
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)

  const handleShowSideNav = () => {
    setIsSideNavVisible(true)
  }

  const handleHideSideNav = () => {
    setIsSideNavVisible(false)
  }
  return (
    <div className="about-page">
      <header className="header">
        <Logo />
        <h2>About Us</h2>
        {token ? (
          <div
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          ></div>
        ) : null}
        <div style={{ position: "fixed", left: "97%" }}>
          <Button
            style={{ borderRadius: "30px", backgroundColor: "#55c2da" }}
            icon="pi pi-bars"
            onClick={handleShowSideNav}
          ></Button>
          <SideNav visible={isSideNavVisible} onHide={handleHideSideNav} />
        </div>
      </header>
      <div className="about-content">
        <h3>Welcome to Trippy</h3>
        <p>
          Trippy is your ultimate destination for dream vacations. We offer a
          wide range of amazing destinations, affordable prices, and the
          opportunity to subscribe to your favorite vacation spots. Whether
          you're seeking adventure, relaxation, or exploration, we have the
          perfect vacation package waiting for you.
        </p>
        <p>
          At Trippy, we are passionate about helping you create unforgettable
          memories. Our team of travel experts works tirelessly to curate the
          best vacation experiences, ensuring you have a stress-free and
          enjoyable trip from start to finish.
        </p>
        <h3>About the Developer</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <p>
            Hi, I'm Yuval Chen, the developer behind Trippy. I'm a full-stack
            developer with a passion for creating user-friendly and innovative
            web applications. Vacation Paradise is the result of my dedication
            to providing travelers like you with a seamless and enjoyable
            vacation planning experience. If you have any suggestions or
            questions, feel free to get in touch. I hope you have an amazing
            time exploring our site!
          </p>
          <img
            src={"/src/assets/images/me.jpg"}
            alt="Yuval Chen"
            className="developer-image"
          />
        </div>
      </div>
      <div className="back-to-home">
        <Link to="/home">
          <Button label="Back to Home" icon="pi pi-arrow-left" />
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
