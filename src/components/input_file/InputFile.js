import React, { useRef, useState } from "react";
import "./inputFile.css";

function InputFile({ handleChange }) {
  const inputFileRef = useRef(null);

  const [fileValue, setFileValue] = useState("");

  function handleCustomeFileClick() {
    inputFileRef.current.click();
  }

  function handleFileChange(event) {
    setFileValue(event.target.value);
    handleChange(event);
  }

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        style={{ marginTop: "1rem" }}
        value={fileValue}
        onChange={handleFileChange}
        hidden
      />

      <div className="input__file__div" onClick={handleCustomeFileClick}>
        <button type="button" className="input-file-button">
          Choose File
        </button>
        <span className="input-file-text">{fileValue}</span>
      </div>
    </>
  );
}

export default InputFile;
