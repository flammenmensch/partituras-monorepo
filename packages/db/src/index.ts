import cote from 'cote';
import mongoose from 'mongoose';
import path from 'path';
import { DbTypes } from '@partituras/events';
import * as partituraService from './services/partituraService';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv')
    .config({
      path: path.resolve(__dirname, '../.env.development.local')
    });
}

mongoose.connect(process.env.MONGODB_URI, {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', (error) => {
  console.error('Could not connect to MongoDB', error.message);
});

conn.once('open', () => {
  console.info('Connected to MongoDB');

  const dbService = new cote.Responder({name: 'MongoDB Service'});

  dbService.on(DbTypes.GET_BY_ID, (request: any, callback) =>
    partituraService.findById(request.id)
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      })
  );

  dbService.on(DbTypes.GET_ALL, (request: any, callback) => {
    partituraService.findAll(request.offset, request.page_size)
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  });

  dbService.on(DbTypes.SEARCH, (request: any, callback) => {
    partituraService.search(request.query)
      .then((result) => {
        callback(null, result)
      })
      .catch((error) => {
        callback(error, null);
      });
  });

  dbService.on(DbTypes.GET_RANDOM, (request: any, callback) => {
    partituraService.getRandom(request.count)
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  });
});
