import { axiosInstance } from '../../dataLayer/axiosInstance';
import { isURL } from '../global';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const getBase64 = buffer =>
  `data:application/octet-stream;base64,${arrayBufferToBase64(buffer)}`;

/**
 * Method for downloading the images from s3
 */
export const getImage = async url => {
  try {
    const response = await axiosInstance(
      15000
    ).post('/api/master/downsize/avatar', { avatar: url });
    const bufferArray = response.data.Body.data;
    return getBase64(bufferArray);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Method for the html image instance creation
 */
export const createImage = url =>
  new Promise(async (resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    let src = url;
    if (isURL(src)) {
      src = await getImage(src);
    }
    image.src = src;
  });

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export const splitBase64File = image => {
  const block = image.split(';');
  const contentType = block[0].split(':')[1]; // In this case "image/gif"
  // get the real base64 content of the file
  const realData = block[1].split(',')[1];
  return { realData, contentType };
};

export const createImageFile = (image, name = 'image') => {
  const { realData, contentType } = splitBase64File(image);
  const blob = b64toBlob(realData, contentType);

  return new File([blob], name, {
    type: contentType,
    lastModified: Date.now(),
  });
};

export const Uint8ToBase64 = u8Arr => {
  const CHUNK_SIZE = 0x8000;
  let index = 0;
  const { length } = u8Arr;
  let result = '';
  let slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return btoa(result);
};

export const getBase64ImageURL = data => {
  const a = data.Body.data;
  const uint8 = new Uint8Array(a);
  const base64 = Uint8ToBase64(uint8);
  return `data:image/jpg;base64,${base64}`;
};

export const getBase64FromFile = file => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', error => reject(error));
  });
};

export const checkIsGif = imageSource =>
  imageSource.split('.').includes('gif', -1) ||
  imageSource.split(';').includes('data:image/gif');
