import { Box, Button, Input, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import baseUrl from "config";
import { FaFilePdf } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ResourceHub = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const token = useSelector((state) => state.token);
  const [allFiles, setAllFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const res = await fetch(`${baseUrl}/get-files`, {
      method: "GET",
    });
    const data = await res.json();
    setAllFiles(data.data);
  };
  const ShowPdf = (pdf) => {
    setPdfFile(`${baseUrl}/assets/${pdf}`);
  };
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    const res = await fetch(`${baseUrl}/upload-files`, {
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

  console.log(allFiles);

  return (
    <WidgetWrapper>
      <Typography>Preview and share study materials! </Typography>
      <form onSubmit={submitImage}>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
        >
          <FaFilePdf size="40" />
          <input
            type="file"
            id="fileInput"
            required
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              marginLeft: "4rem",
            }}
          />
          <Input
            placeholder="Give your file a title"
            required
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>

      <Box>
        <h4>Scroll to see all Uploaded materials:</h4>
        <Box
          display="flex"
          gap="1rem"
          style={{
            overflowX: "scroll",
          }}
        >
          {allFiles.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              color="primary.main"
            >
              No files uploaded!! 
            </Box>
          ) : (
            allFiles.map((data) => (
              <Box
                border="gray 1px solid"
                borderRadius="10px"
                minWidth="150px"
                p={"1rem"}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <h6>{data.title}</h6>
                <Button variant="outlined" onClick={() => ShowPdf(data.pdf)}>
                  Show Pdf
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
      <h2>Preview:</h2>
      <PdfComp pdfFile={pdfFile} />
    </WidgetWrapper>
  );
};

export default ResourceHub;
