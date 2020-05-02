import axios from 'axios';
import sharp from 'sharp';

export const loadImages = async (pages: Array<{ url: string }>): Promise<ArrayBuffer[]> => {
  return await Promise.all(
    pages.map(async page => {
      const image = await axios({url: page.url, responseType: 'arraybuffer'});
      return await sharp(image.data).toBuffer();
    })
  );
};
