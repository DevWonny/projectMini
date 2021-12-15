import React from "react";
import UploadForm from "../components/UploadForm";
import ToolBar from "../components/ToolBar";
import ImageList from "../components/ImageList";
import "./Main.scss";

function Main() {
  return (
    <div className="mainWrap">
      <ToolBar />
      {/* toolbar => logout btn, title, username */}
      <div className="mainImgWrap">
        <UploadForm />
        <ImageList />
      </div>
    </div>
  );
}

export default Main;
