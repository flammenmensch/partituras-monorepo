import cote from 'cote';
import { DbTypes } from '@partituras/events';

export const createRequester = (name: string) => {
  const requester = new cote.Requester({ name });
  return {
    send: (type: DbTypes, args: object = {}) => new Promise((resolve, reject) => {
      requester.send({ type, ...args }, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    }),
  };
};
