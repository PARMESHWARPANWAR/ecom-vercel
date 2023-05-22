import React, { Fragment, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import resumePDF from "./resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ResumePage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const downloadResume = () => {
    window.open(resumePDF, "_blank");
  };
  const handlePageRender = ({ canvasContext, textContent }) => {
    textContent.items.forEach((item) => {
      // Set the opacity of each text item to 0
      canvasContext.beginPath();
      canvasContext.rect(
        item.transform[4],
        item.transform[5],
        item.width,
        item.height
      );
      canvasContext.fillStyle = "white";
      canvasContext.fill();
    });
  };

  return (
    <Fragment className="bg-green-900">
      <div className="flex flex-col items-center pt-10 h-screen bg-gray-700">
        <h1 className="text-4xl font-bold mb-6">My Resume</h1>
        <button
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md z-50"
          onClick={downloadResume}
        >
          Download Resume
        </button>
        <div className="w-1/2 mt-20">
          <div className="px-auto">
            <Document file={resumePDF}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  onRenderSuccess={handlePageRender}
                  renderTextLayer={false} // Disable rendering of text layer
                  // width={1000} // Set the width here
                  // height={600} // Set the height here
                  className="w-screen h-screen"
                />
              ))}
            </Document>
          </div>

          {/* <div className="flex justify-center mt-4 bg-green-900 z-50">
            <button
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md z-50"
              onClick={previousPage}
            >
              Previous Page
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md z-50"
              onClick={nextPage}
            >
              Next Page
            </button>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default ResumePage;
