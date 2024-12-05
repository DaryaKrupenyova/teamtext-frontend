import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface FileProps {
  placeholder: string;
}

export const File: React.FC<FileProps> = ({ placeholder }) => {
  const modules = {
    toolbar: [[{ header: "1" }, { header: "2" }, { font: [] }], [{ size: [] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image", "video"], ["clean"]],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html: string) => {
    setEditorHtml(html);
    console.log(editorHtml);
  };

  return (
    <div>
      <ReactQuill theme="snow" onChange={handleChange} value={editorHtml} modules={modules} formats={formats} bounds={".app"} placeholder={placeholder} />
    </div>
  );
};
