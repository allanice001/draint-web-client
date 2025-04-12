export default function readeFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', () => {
      reader.abort();
      reject(new Error('Error during the file reading occurred'));
    });
  });
}

export const readFiles = files => {
  let index = 0;
  const promises = [];
  for (index; index < files?.length; index++) {
    promises.push(readeFile(files[index]));
  }
  return Promise.all(promises)
    .then(value => value)
    .catch(error => error);
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0 || !bytes) return '0 bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
