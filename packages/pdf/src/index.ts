import http, { ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { DbTypes } from '@partituras/events';
import { createRequester } from './utils/createRequester';
import { loadImages } from './services/imageService';
import { addImageToDocument, createPdfDocument } from './services/pdfService';

const PORT = process.env.PORT || 4001;
const CACHE_DIR = process.env.CACHE_DIR || path.join(__dirname, '../../../.data/pdf-cache');

const requester = createRequester('PDF Requester');

const sendResponse = (response: ServerResponse, statusCode: number, body: object = {}) =>
  response
    .writeHead(statusCode, {'content-type':'application/json'})
    .end(JSON.stringify(body));

const sendBlankResponse = (response: ServerResponse) =>
  sendResponse(response, 405)

const sendNotFound = (response: ServerResponse) =>
  sendResponse(response, 404, { error: 'Not found' });

const sendError = (response: ServerResponse, error: Error) =>
  sendResponse(response, 500, { error: error.message });

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    return sendBlankResponse(res);
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const {id} = JSON.parse(body) as { id: string };

      if (id === undefined) {
        return sendError(res, new Error('Partitura id is required'));
      }

      const headers = {
        'content-type': 'application/x-pdf',
        'content-disposition': `attachment; filename=${id}.pdf`,
      };

      const cachedFilePath = `${CACHE_DIR}/${id}.pdf`;

      if (fs.existsSync(cachedFilePath)) {
        const cachedFile = fs.createReadStream(cachedFilePath);
        res.writeHead(200, headers);

        cachedFile.pipe(res);

        return;
      }

      const partitura = await requester.send(DbTypes.GET_BY_ID, {id});

      if (!partitura) {
        return sendNotFound(res);
      }

      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR);
      }

      const doc = createPdfDocument();

      res.writeHead(200, headers);

      doc.pipe(res);
      doc.pipe(fs.createWriteStream(cachedFilePath))

      const images: ArrayBuffer[] = await loadImages(partitura.scores);

      const addImageFn = addImageToDocument(doc);

      images.forEach(addImageFn);

      doc.end();
    } catch (error) {
      sendError(res, error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`PDF generation server is running at ${PORT}`);
});
