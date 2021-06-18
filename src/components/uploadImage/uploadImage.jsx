import React, { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "./uploadImage.css";
import { observer } from "mobx-react-lite";
const UploadImage = observer(({ userStore }) => {
  const uppy = new Uppy();
  const { create } = require("ipfs-http-client");
  const ipfs = create("https://ipfs.infura.io:5001");
  const [buffer, setBuffer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting the File...");
    setIsLoading(true);
    const { cid } = await ipfs.add(buffer);
    console.log("IPFS Hash: ", cid.string);
    userStore.setStorageValue(cid.string);
    setIsLoading(false);
  };
  uppy.on("file-added", async (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file.data);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  });
  useEffect(() => {
    if (buffer !== "") {
      handleSubmit();
    }
  }, [buffer]);
  return (
    <div className="Container">
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand mb-0 h1 text-center">IPFS Image Sharing</h1>
      </nav>
      <main role="main" className="inner cover mx-sm-3 mb-2 ">
        <div className="drag-drop-btn">
          <DragDrop
            uppy={uppy}
            locale={{
              strings: {
                dropHereOr: "Drop here or %{browse}",
                browse: "browse",
              },
            }}
          />
          <p>{isLoading ? "Please wait.." : ""}</p>
        </div>
      </main>
    </div>
  );
});
export default UploadImage;
