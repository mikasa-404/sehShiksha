import { Box, Button, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const ResourceHub = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const token = useSelector((state) => state.token);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const res = await fetch("get-files", {
      method: "GET",
    });
    const data = await res.json();
    setAllFiles(data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    const res = await fetch("upload-files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.status === 200) {
      alert("Uploaded Successfully!!!");
      setTitle("");
      setFile(null); // Reset file to null after submission
      document.getElementById("fileInput").value = "";
      getPdf();
    }
  };

  
  return (
    <WidgetWrapper>
      <Typography>Preview and share study materials! </Typography>
      <h1>Upload PDF:</h1>

      <form onSubmit={submitImage}>
        <TextField
          placeholder="Title"
          required
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          id="fileInput"
          required
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button type="submit">Submit</Button>
      </form>
      <Box>
        <h4>Uploaded PDF:</h4>
        <Box display="flex" overflowX="scroll" gap="1rem">
          {allFiles === null
            ? ""
            : allFiles.map((data) => (
                <Box border="gray 1px solid" borderRadius="10px">
                  <h6>{data.title}</h6>
                  <Button variant="contained">Show Pdf</Button>
                </Box>
              ))}
        </Box>
      </Box>
      <PdfComp/>
    </WidgetWrapper>
  );
};

export default ResourceHub;
