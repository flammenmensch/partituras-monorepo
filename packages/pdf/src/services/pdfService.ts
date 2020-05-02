import PdfDocument, {} from 'pdfkit';
import PDFDocument = PDFKit.PDFDocument;

export const createPdfDocument = () => {
  return new PdfDocument({
    size: 'A4',
    layout: 'portrait',
    autoFirstPage: false,
  });
};

export const addImageToDocument = (document: PDFDocument) => (image: ArrayBuffer) => {
  document.addPage().image(image, 10, 10, {fit: [575, 822]});
}
