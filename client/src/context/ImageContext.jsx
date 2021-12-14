import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

export function ImageProvider(prop) {
  const [img, setImg] = useState([]);
  const [me] = useContext(AuthContext);

  useEffect(() => {
    if (me) {
      setTimeout(() => {
        axios
          .get("/users/me/images")
          .then((result) => setImg(result.data))
          .catch((e) => console.log(e));
      }, 0);
    } else {
      setImg([]);
    }
  }, [me]);

  return (
    <ImageContext.Provider value={{img, setImg }}>
      {prop.children}
    </ImageContext.Provider>
  );
}
