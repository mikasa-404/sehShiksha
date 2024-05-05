import { Box, Button, Input, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import baseUrl from "config";
import { FaDownload, FaFilePdf } from "react-icons/fa";

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
  const downloadPdf = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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

      <Box mt={"2rem"}>
        <Box
          display="flex"
          gap="1rem"
          style={{
            overflowX: "scroll",
            scrollbarWidth: "thin", // Setting the width of the scrollbar
            "-ms-overflow-style": "none", // Hiding scrollbar for IE and Edge
            "scrollbar-color": "#ccc transparent", // Color of the scrollbar
            "&::-webkit-scrollbar": {
              width: "6px", // Width of the scrollbar for Webkit browsers (e.g., Chrome, Safari)
            },
           
          }}
          p={"0.5rem"}
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
                borderRadius="10px"
                p={"1rem"}
                display="flex"
                flexDirection="column"
                justifyContent={"space-between"}
                gap={"0.5rem"}
                boxShadow={"0px 5px 5px #ccc"}
                minWidth={"200px"}
              >
                <Typography fontWeight={500}>{data.title+".pdf"}</Typography>

                 <Box display="flex" gap="0.5rem">
                  <Button variant="outlined" onClick={() => ShowPdf(data.pdf)}>
                    Show Pdf
                  </Button>
                  <Button variant="outlined" onClick={() => downloadPdf(`${baseUrl}/assets/${data.pdf}`)}>
                    <FaDownload />
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
      <h2>Preview:</h2>
      <Typography>Click on show pdf to preview your pdf here!</Typography>
      <PdfComp pdfFile={pdfFile} />
    </WidgetWrapper>
  );
};

export default ResourceHub;
