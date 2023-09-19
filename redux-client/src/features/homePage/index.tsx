import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../ui-components/logo"
import "./HomePage.css"
import ReviewList from "../ui-components/review-list"
import { Button } from "primereact/button"
import SideNav from "../ui-components/side-nav"
import LogoutButton from "../ui-components/logout-button"

const HomePage = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)

  const handleShowSideNav = () => {
    setIsSideNavVisible(true)
  }

  const handleHideSideNav = () => {
    setIsSideNavVisible(false)
  }

  const token = localStorage.getItem("token")
  const firstName = JSON.parse(
    localStorage.getItem("userRecord") as any,
  )?.firstName
  return (
    <div className="home-page-container">
      <header className="header">
        <Logo />
        {token ? (
          <div>
            <h2>Welcome {firstName}</h2>
          </div>
        ) : (
          <h2>Welcome to Vacation Paradise</h2>
        )}
        {token ? (
          <div style={{ display: "flex" }}>
            <LogoutButton></LogoutButton>
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

      <div style={{ marginTop: "200px" }}>
        <ReviewList />
        <div className="add-review-container">
          <h2>Add Your Review</h2>
          {/* Add your "Add Review" form or content here */}
        </div>
      </div>
    </div>
  )
}

export default HomePage
