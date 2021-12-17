import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

export function ImageProvider(prop) {
  const [img, setImg] = useState([]);
  const [me] = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("/users/me/images");
  const [imgLoading, setImgLoading] = useState(false);
  const pastImgUrlRef = useRef();

  useEffect(() => {
    if (pastImgUrlRef.current === imgUrl) return;
    setImgLoading(true);

    if (me) {
      setTimeout(() => {
        axios
          .get(imgUrl)
          .then((result) => { setImg((pervData) => [...pervData, ...result.data]) })
          .catch((e) => console.log(e)).finally(() => {
            setImgLoading(false);
            pastImgUrlRef.current = imgUrl;
          });
      }, 0);
    } else {
      setImg([]);
    }
  }, [me, imgUrl]);

  return (
    <ImageContext.Provider value={{img, setImg , imgLoading,setImgUrl}}>
      {prop.children}
    </ImageContext.Provider>
  );
}
