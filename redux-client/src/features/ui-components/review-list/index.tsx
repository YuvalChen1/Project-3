import React from "react"
import "./review.css"

const ReviewList = () => {
  const reviews = [
    {
      id: 1,
      username: "User1",
      avatar:
        "https://cdn2.iconfinder.com/data/icons/sweety-girl-1/300/2-512.png",
      title: "Great Vacation",
      content: "I had an amazing time on my vacation. Highly recommend!",
    },
    {
      id: 2,
      username: "User2",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXbX8lgdCQkrZK-A1JTmdNi13cWKzFM4tdQ&usqp=CAU",
      title: "Fantastic Experience",
      content:
        "This was the best vacation of my life. Will definitely come back!",
    },
  ]

  return (
    <div className="review-list">
      <h2 style={{ marginBottom: "100px", marginLeft:"25px"}}>
        Our Reviews :
      </h2>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="avatar">
            <img src={review.avatar} alt={`${review.username}'s avatar`} />
          </div>
          <div className="review-content">
            <h3>{review.username}</h3>
            <h4>{review.title}</h4>
            <p>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewList
