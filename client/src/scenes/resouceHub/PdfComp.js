import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "./1.pdf";

const PdfComp = (props) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-div">
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Here should be your Page component */}
      </Document>
    </div>
  );
};

export default PdfComp;
