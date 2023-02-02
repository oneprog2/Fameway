import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.css";
import { Box } from "@mui/material";

const QuillEditor = () => {
  const [text, setText] = useState("");
  const quillRef = React.useRef();

  return (
    <Box
      onClick={() => {
        quillRef.current.focus();
      }}
      sx={{
        cursor: "text",
        p: 0,
        m: 0,
        borderColor: "#dee3e9",
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: "solid",
      }}
    >
      <ReactQuill
        ref={quillRef}
        value={text}
        onChange={(value) => {
          setText(value);
        }}
        placeholder="Type here..."
      />
    </Box>
  );
};

export default QuillEditor;
