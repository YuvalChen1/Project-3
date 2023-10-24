import React from "react"
import "./review.css"

const ReviewList = () => {
  const reviews = [
    {
        id: 1,
        username: "Johanna Trine Capilla",
        avatar: "https://cdn2.iconfinder.com/data/icons/sweety-girl-1/300/2-512.png",
        title: "Great Vacation",
        content: "I had an amazing time on my vacation. Highly recommend!",
    },
    {
        id: 2,
        username: "Nöl Vsevolod Baggio",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXbX8lgdCQkrZK-A1JTmdNi13cWKzFM4tdQ&usqp=CAU",
        title: "Fantastic Experience",
        content: "This was the best vacation of my life. Will definitely come back!",
    },
    {
        id: 3,
        username: "John Cena",
        avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        title: "Loved It",
        content: "Was a great experience, the best vacation site",
    },
    {
        id: 4,
        username: "Linda Johnson",
        avatar: "https://static.vecteezy.com/system/resources/thumbnails/009/397/892/small/woman-face-expression-clipart-design-illustration-free-png.png",
        title: "Unforgettable Journey",
        content: "My vacation was absolutely unforgettable. I can't wait to go back!",
    },
    {
        id: 5,
        username: "Michael Smith",
        avatar: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        title: "Incredible Destination",
        content: "The destination was incredible, and I had the time of my life on this vacation. Highly recommended!",
    },
    {
        id: 6,
        username: "Sophia Brown",
        avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png",
        title: "Awesome Trip",
        content: "My trip was awesome. I enjoyed every moment of it. Definitely a must-visit place!",
    },
    {
        id: 7,
        username: "David Lee",
        avatar: "https://st3.depositphotos.com/19428878/37071/v/450/depositphotos_370714622-stock-illustration-businessman-icon-vector-male-avatar.jpg",
        title: "Simply the Best",
        content: "This vacation was simply the best. I can't wait to explore more destinations with this service!",
    },
    {
        id: 8,
        username: "Olivia Williams",
        avatar: "https://w7.pngwing.com/pngs/670/509/png-transparent-avatar-female-girls-avatar-purple-face-black-hair-thumbnail.png",
        title: "Magical Experience",
        content: "The experience I had on this vacation was magical. It exceeded all my expectations!",
    },
];

  return (
    <div
      className="review-list"
      style={{ marginBottom: "100px", position: "relative", bottom: "150px" }}
    >
      <h2 style={{ margin: "70px", marginLeft: "120px" }}>Our Reviews :</h2>
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
