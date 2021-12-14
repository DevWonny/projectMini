import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";
import { Link } from "react-router-dom";

function ImageList() {
  const { img } = useContext(ImageContext);

  const imgList = img.map((image) => (
    <Link key={image.key} to={`/images/${image._id}`}>
      <img
        style={{ width: "100%" }}
        src={`http://localhost:5000/uploads/${image.key}`}
        alt=""
      />
    </Link>
  ));

  return <div>{imgList}</div>;
}

export default ImageList;
