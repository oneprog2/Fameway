import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.css";
import { Box } from "@mui/material";

const QuillEditor = (props) => {
  const quillRef = React.useRef();

  return (
    <Box
      sx={{
        cursor: "text",
        p: 0,
        m: 0,
        borderColor: "#dee3e9",
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: "solid",
        flex: 1,
      }}
    >
      <ReactQuill
        {...props}
        ref={quillRef}
        value={props.value}
        onChange={props.onChange}
      />
    </Box>
  );
};

export default QuillEditor;
