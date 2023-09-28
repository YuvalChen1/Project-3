import React, { useState } from "react"

function Image({ src, errorSrc, alt }: any) {
  const [imageSrc, setImageSrc] = useState(src)

  const handleImageError = () => {
    setImageSrc(errorSrc)
  }

  return <img src={imageSrc} alt={alt} onError={handleImageError} />
}

export default Image
