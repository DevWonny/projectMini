import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ImageContext } from "../context/ImageContext";
import "./UploadForm.scss";

function UploadForm() {
  const { img, setImg } = useContext(ImageContext);
  const defaultFileName = "이미지 파일을 업로드 해주세요!";
  const [files, setFiles] = useState(null);
  const [previews, setPreviews] = useState([]);

  const imageSelectHandler = async (e) => {
    const imageFiles = e.target.files;
    setFiles(imageFiles);

    const imagePreviews =await Promise.all(
      [...imageFiles].map((imageFile) => {
        return new Promise((resolve, reject) => {
          try {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = (e) => {
              resolve({imgSrc : e.target.result, fileName :imageFile.name});
            };
          } catch (e) {
            reject(e);
          }
        });
      })
    );
    
    setPreviews(imagePreviews);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of files) {
      // image : key , file : value
      formData.append("image", file);
    }

    try {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImg([ ...res.data, ...img]);
      toast.success("success!");
      setTimeout(() => {
        setPreviews([]);
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      setPreviews([]);
    }
  };

  const previewImages = previews.map((preview, index) => (
    <img src={preview.imgSrc} alt="" className="image-prev" key={index} />
  ));

  const filename = previews.length === 0 ? defaultFileName : previewImages;

  return (
    <form onSubmit={submit} className="uploadForm">
      <div className="file-dropper">
        {filename}
        <input
          id="image"
          type="file"
          accept="image/*"
          multiple
          onChange={imageSelectHandler}
        />
      </div>

      <button type="submit">업로드</button>
    </form>
  );
}

export default UploadForm;
