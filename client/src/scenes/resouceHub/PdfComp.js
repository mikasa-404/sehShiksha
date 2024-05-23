import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "./sample.pdf";
import { Box } from "@mui/material";

const PdfComp = (props) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1)
  };

  return (
    <Box p="10px" border="1px solid " mt="1rem" bgcolor="primary.light" display="flex" alignItems="center" flexDirection="column" width="100%">
      <Box display="flex" justifyContent="center" mb="1rem" gap="0.5rem">
        <button
          onClick={() => {
            if (pageNumber > 1) setPageNumber(pageNumber - 1);
          }}
        >
          Prev
        </button>
        Page {pageNumber} of {numPages}
        <button
          onClick={() => {
            if (pageNumber < numPages) setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </button>
      </Box>
      <Document file={props.pdfFile || pdf} onLoadSuccess={onDocumentLoadSuccess}  >
        {/* Here should be your Page component */}
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </Box>
  );
};

export default PdfComp;
