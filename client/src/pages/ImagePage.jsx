import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToolBar from "../components/ToolBar";
import { ImageContext } from "../context/ImageContext";
import { toast } from "react-toastify";
import "./ImagePage.scss";

function ImagePage() {
  const { imageId } = useParams();
  const { img, setImg } = useContext(ImageContext);
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const imageRef = useRef();

  useEffect(() => {
      imageRef.current = img.find((image) => image._id === imageId);
  }, [img, imageId]);

  console.log(img);

  useEffect(() => {
    setTimeout(() => {
      if (imageRef.current) setImage(imageRef.current);
      else axios.get(`/images/${imageId}`).then(({ data }) => setImage(data));
    },50)
    
  }, [imageId]);

  if (!image) return <h2>Loading...</h2>;

  const deleteBtn = async () => {
    try {
      if (!window.confirm("정말로 삭제하시겠습니까?")) return;

      const result = await axios.delete(`/images/${imageId}`);
      toast.success(result.data.message);
      setImg(img.filter((image) => image._id !== imageId));
      navigate("/main");
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <div className="ImageListWrap">
      <ToolBar />
      <div className="imageBox">
        <img src={`http://localhost:5000/uploads/${image.key}`} alt={imageId} />
        <button onClick={deleteBtn}>삭제</button>
      </div>
    </div>
  );
}

export default ImagePage;
