import React, { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "./uploadImage.css";
import { observer } from "mobx-react-lite";
const UploadImage = observer(({ userStore }) => {
  const uppy = new Uppy({
    onBeforeFileAdded: (file, files) => {
      userStore.setErrorMessage("");
      userStore.setStorageValue("");
      let reg = /(gif|jpg|jpeg|png|gif|svg|webp|pdf)$/i;
      if (!reg.test(file.name)) {
        userStore.setErrorMessage(
          " Error: File type is not supported. Supported file types are JPG, JPEG, PNG, GIF, SVG, WEBP, PDF."
        );
      } else if (file.data.size >= 1048576) {
        userStore.setErrorMessage(" Error: Max file size limit is 10 MB.");
      } else {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file.data);
        reader.onloadend = () => {
          setBuffer(Buffer(reader.result));
        };
      }
    },
  });
  const { create } = require("ipfs-http-client");
  const ipfs = create("https://ipfs.infura.io:5001");
  const [buffer, setBuffer] = useState("");

  const handleSubmit = async () => {
    console.log("Submitting the File...");
    userStore.setIsLoading(true);
    const { cid } = await ipfs.add(buffer);
    console.log("IPFS Hash: ", cid.string);
    userStore.setStorageValue(cid.string);
    userStore.setIsLoading(false);
  };

  useEffect(() => {
    if (buffer !== "") {
      handleSubmit();
    }
  }, [buffer]);
  return (
    <div>
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
      </div>
    </div>
  );
});
export default UploadImage;
