import React, { useCallback, useContext, useEffect, useRef } from "react";
import { ImageContext } from "../context/ImageContext";
import { Link } from "react-router-dom";
import "./ImageList.scss";

function ImageList() {
  const { img, setImgUrl, imgLoading } = useContext(ImageContext);
  const elementRef = useRef(null);

  const loaderMoreImg = useCallback(() => {
    if (img.length === 0 || imgLoading) return;
    const lastImgId = img[img.length - 1]._id;
    setImgUrl(`/users/me/images?lastid=${lastImgId}`);
  }, [img, setImgUrl, imgLoading]);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loaderMoreImg();
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loaderMoreImg]);

  const imgList = img.map((image, index) => (
    <Link
      key={image.key}
      to={`/images/${image._id}`}
      ref={index + 5 === img.length ? elementRef : undefined}
      className="image"
    >
      <img src={`http://localhost:5000/uploads/${image.key}`} alt="" />
    </Link>
  ));

  return (
    <div className="imageListWrap">
      {imgList}
      {imgLoading && <div>Loading...</div>}
    </div>
  );
}

export default ImageList;
