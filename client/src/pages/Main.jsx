import React from "react";
import UploadForm from "../components/UploadForm";
import ToolBar from "../components/ToolBar";
import ImageList from "../components/ImageList";

function Main() {
  return (
    <>
      <ToolBar />
      {/* toolbar => logout btn, title, username */}
      <div>
        <UploadForm />
        <ImageList />
      </div>
    </>
  );
}

export default Main;
