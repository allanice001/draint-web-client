import {
  SIZE_LIMIT_HEIGHT,
  SIZE_LIMIT_WIDTH,
} from '../../constants/images/images';

import { resizeImageService } from '../imageResizeService';

export default function prepareImageForSaving(file, callback) {
  console.log('prepareImageForSaving FILE', file);
  if (file) {
    // const file = new File([selectedFile], 'file', { type: 'image/jpeg', lastModified: Date.now() });
    const fileName = file.name;
    const fileSize = file.size;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = async () => {
        const data = new FormData();
        const resizeBigFullWidth = resizeImageService(img, 1920);
        const resizeBigFullHeight = resizeImageService(img, 1024);
        const resizeSmall = resizeImageService(img, 600);
        // console.log('asdasaaaa', img);
        if (
          img.width > img.height &&
          fileSize >= SIZE_LIMIT_WIDTH &&
          !img.src.includes('data:image/gif')
        ) {
          resizeBigFullWidth
            .then(blob => {
              const fileBlob = new File([blob], fileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              data.append('file', fileBlob);
              data.append('type', 'artwork-image');
              // console.log(fileBlob);
              return data;
            })
            .then(data =>
              resizeSmall.then(blob => {
                const fileBlob = new File([blob], fileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                data.append('file', fileBlob);
                data.append('type', 'artwork-image-sm');
                // console.log(fileBlob);
                return fileBlob;
              })
            )
            .then(fileBlob => {
              callback(fileBlob);
            });
        } else if (
          img.width < img.height &&
          fileSize >= SIZE_LIMIT_HEIGHT &&
          !img.src.includes('data:image/gif')
        ) {
          resizeBigFullHeight
            .then(blob => {
              const fileBlob = new File([blob], fileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              data.append('file', fileBlob);
              data.append('type', 'artwork-image');
              // console.log(fileBlob);
              return data;
            })
            .then(data =>
              resizeSmall.then(blob => {
                const fileBlob = new File([blob], fileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                data.append('file', fileBlob);
                data.append('type', 'artwork-image-sm');
                // console.log(fileBlob);
                return fileBlob;
              })
            )
            .then(fileBlob => {
              callback(fileBlob);
            });
        } else if (!img.src.includes('data:image/gif')) {
          const fileBlob = new File([file], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          data.append('file', fileBlob);
          data.append('type', 'artwork-image');
          // console.log(data);
          resizeSmall
            .then(blob => {
              const fileBlob = new File([blob], fileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              data.append('file', fileBlob);
              data.append('type', 'artwork-image-sm');
              // console.log(fileBlob);
              return fileBlob;
            })
            .then(fileBlob => {
              callback(fileBlob);
            });
        } else {
          // console.log('ASDASD', file);
          // const fileBlob = new File([file], fileName, { type: 'image/jpeg', lastModified: Date.now() });
          // data.append('file', fileBlob);
          // data.append('type', 'artwork-image');
          // console.log(fileBlob);
          // data.append('file', fileBlob);
          // data.append('type', 'artwork-image');
          // console.log(fileBlob);
          await callback(file);
          return file;
        }
      };
    };
  }
}
