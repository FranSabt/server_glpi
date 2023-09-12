import React from 'react';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './pdf/pdfDocument';
import Mynavbar from './navbar/Navbar'
import MyForm from './form/form'

const App = () => {
  return (
    <>
      <Mynavbar/>
      <MyForm/>
      {/* <PDFViewer width={"100%"} height={800}>
        <PdfDocument/>
      </PDFViewer> */}
    </>
  );
};

export default App;
