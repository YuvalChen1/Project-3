import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.facebook.com">
            <i className="pi pi-facebook"></i>
          </a>
          <a href="https://www.instagram.com">
            <i className="pi pi-instagram"></i>
          </a>
          <a href="https://www.youtube.com">
            <i className="pi pi-youtube"></i>
          </a>
          <a href="https://github.com/YuvalChen1">
            <i className="pi pi-github"></i>
          </a>
        </div>

        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: yuvalch00@gmail.com</p>
          <p>Phone: +972 (054) 683-0556</p>
        </div>

        <div className="company-info">
          <h3>Company Info</h3>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
