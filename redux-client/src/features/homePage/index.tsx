import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../ui-components/logo"
import "./homePage.css"
import ReviewList from "../ui-components/review-list"
import { Button } from "primereact/button"
import SideNav from "../ui-components/side-nav"
import LogoutButton from "../ui-components/logout-button"

const HomePage = () => {
  const reviewSection = useRef<HTMLElement>(null)
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0)
  const token = localStorage.getItem("token")
  const firstName = localStorage.getItem("firstName")

  const scrollToSection = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setCurrentSectionIndex(0)
    }
  }
  //framer motion

  const handleShowSideNav = () => {
    setIsSideNavVisible(true)
  }

  const handleHideSideNav = () => {
    setIsSideNavVisible(false)
  }

  return (
    <div className="home-page-container">
      <header className="header">
        <Logo />
        {token ? (
          <div className="welcome-message">
            <h3>
              Welcome <span style={{ color: "blue" }}>{firstName}</span>
            </h3>
          </div>
        ) : (
          <h2>Welcome to Vacation Paradise</h2>
        )}
        {token ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center"  }}>
            <div style={{ position: "fixed", left: "97%" }}>
              <Button
                style={{ borderRadius: "30px", backgroundColor: "#55c2da" }}
                icon="pi pi-bars"
                onClick={handleShowSideNav}
              ></Button>
              <SideNav visible={isSideNavVisible} onHide={handleHideSideNav} />
            </div>
          </div>
        ) : (
          <p>Your Ultimate Destination for Dream Vacations</p>
        )}
      </header>

      <div className="features-container">
        <div className="feature">
          <i className="pi pi-calendar"></i>
          <h2>Explore Amazing Destinations</h2>
          <p>Discover a wide range of vacation spots to choose from.</p>
        </div>
        <div className="feature">
          <i className="pi pi-heart"></i>
          <h2>Subscribe to Favorites</h2>
          <p>Save your favorite vacations and get updates.</p>
        </div>
        <div className="feature">
          <i className="pi pi-money-bill"></i>
          <h2>Affordable Prices</h2>
          <p>Enjoy fantastic vacations without breaking the bank.</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready for Your Next Adventure?</h2>
        <div className="cta-button-container">
          <Link to="/login" className="cta-button">
            Start Exploring
          </Link>
        </div>
      </div>

      <Button
        style={{
          marginTop: "100px",
          position: "relative",
          marginRight: "11.5px",
        }}
        icon="pi pi-chevron-down"
        className="scroll-button"
        onClick={() => scrollToSection(reviewSection)}
      ></Button>

      <span ref={reviewSection as any}></span>
      <div style={{ marginTop: "200px" }}>
        <Button
          style={{ bottom: "100px" }}
          icon="pi pi-chevron-up"
          className="scroll-button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }}
        ></Button>
        <ReviewList />
        {/* {token ? (
          <div className="add-review-container">
            <h2>Add Your Review</h2>
          </div>
        ) : null} */}
      </div>
    </div>
  )
}

export default HomePage
