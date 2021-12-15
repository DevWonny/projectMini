import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";
import { Link } from "react-router-dom";
import "./ImageList.scss";

function ImageList() {
  const { img } = useContext(ImageContext);

  const imgList = img.map((image) => (
    <Link key={image.key} to={`/images/${image._id}`} className="image">
      <img
        src={`http://localhost:5000/uploads/${image.key}`}
        alt=""
      />
    </Link>
  ));

  return <div className="imageListWrap">{imgList}</div>;
}

export default ImageList;
