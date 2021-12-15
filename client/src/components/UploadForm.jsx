import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ImageContext } from "../context/ImageContext";
import "./UploadForm.scss";

function UploadForm() {
  const { img, setImg } = useContext(ImageContext);
  const defaultFileName = "이미지 파일을 업로드 해주세요!";
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  // const [isPublic] = useState("false");

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // image : key , file : value
    formData.append("image", file);
    // formData.append("public", isPublic);
    try {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImg([...img, res.data]);
      toast.success("success!");
      setTimeout(() => {
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      setFileName(defaultFileName);
      setImgSrc(null);
    }
  };

  return (
    <form onSubmit={submit} className="uploadForm">
      <div className="file-dropper">
        {imgSrc ? (
          <img src={imgSrc} alt="" className="image-prev" />
        ) : (
          fileName
        )}

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imageSelectHandler}
        />
      </div>

      <button type="submit">업로드</button>
    </form>
  );
}

export default UploadForm;
