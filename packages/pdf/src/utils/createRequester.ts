import cote from 'cote';
import { DbTypes } from '@partituras/events';

type Args = { id: string };

type Response = {
  scores: { url: string }[];
};

export const createRequester = (name: string) => {
  const requester = new cote.Requester({ name });
  return {
    send: (type: DbTypes.GET_BY_ID, args: Args): Promise<Response> => new Promise((resolve, reject) => {
      requester.send({ type, ...args }, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response as Response);
      });
    }),
  };
};
