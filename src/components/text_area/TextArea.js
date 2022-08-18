import React from "react";
import "./TextArea.css";

function TextArea({ handleChange, textValue }) {
  return (
    <>
      <textarea
        className="TextArea"
        rows="8"
        placeholder="Content"
        onChange={handleChange}
        value={textValue}
      ></textarea>
    </>
  );
}

export default TextArea;
