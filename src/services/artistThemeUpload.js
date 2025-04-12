import { resizeImageService } from './imageResizeService';

const SIZE_LIMIT_WIDTH = 1000000;
const SIZE_LIMIT_HEIGHT = 1000000;

const isHorizontal = img => {
  return img.width > img.height;
};

const isVertical = img => {
  return img.width < img.height;
};

export const uploadImage = (file, id, actions) => {
  if (file) {
    const { setUploadedAvatarBig, setUploadedAvatarSmall } = actions;
    const { name, size } = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', event => {
      const img = new Image();
      img.src = event.target.result;

      img.addEventListener('load', () => {
        const resizeBigFullWidth = resizeImageService(img, 1920);
        const resizeBigFullHeight = resizeImageService(img, 1024);
        const resizeSmall = resizeImageService(img, 600);

        if (
          isHorizontal(img) &&
          size >= SIZE_LIMIT_WIDTH &&
          !img.src.includes('data:image/gif')
        ) {
          resizeBigFullWidth
            .then(blob => {
              const data = new FormData();
              data.append(
                'file',
                new File([blob], name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                })
              );
              data.append('type', 'artist-theme');
              data.append('id', id);
              setUploadedAvatarBig(data);
            })
            .then(
              resizeSmall.then(blob => {
                const data = new FormData();
                data.append(
                  'file',
                  new File([blob], name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  })
                );
                data.append('type', 'artist-theme-sm');
                data.append('id', id);
                setUploadedAvatarSmall(data);
              })
            );
        } else if (
          isVertical(img) &&
          size >= SIZE_LIMIT_HEIGHT &&
          !img.src.includes('data:image/gif')
        ) {
          resizeBigFullHeight
            .then(blob => {
              const data = new FormData();
              data.append(
                'file',
                new File([blob], name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                })
              );
              data.append('type', 'artist-theme');
              data.append('id', id);
              setUploadedAvatarBig(data);
            })
            .then(
              resizeSmall.then(blob => {
                const data = new FormData();
                data.append(
                  'file',
                  new File([blob], name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  })
                );
                data.append('type', 'artist-theme-sm');
                data.append('id', id);
                setUploadedAvatarSmall(data);
              })
            );
        } else if (!img.src.includes('data:image/gif')) {
          const data = new FormData();
          data.append('file', file);
          data.append('type', 'artist-theme');
          data.append('id', id);
          setUploadedAvatarBig(data);
          resizeSmall.then(blob => {
            const data = new FormData();
            data.append(
              'file',
              new File([blob], name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
            );
            data.append('type', 'artist-theme-sm');
            data.append('id', id);
            setUploadedAvatarSmall(data);
          });
        } else {
          const data = new FormData();
          data.append('file', file);
          data.append('type', 'artist-theme');
          data.append('id', id);
          setUploadedAvatarBig(data);
          const dataSmall = new FormData();
          dataSmall.append('file', file);
          dataSmall.append('type', 'artist-theme');
          dataSmall.append('id', id);
          setUploadedAvatarSmall(dataSmall);
        }
      });
      reader.addEventListener('error', error => console.log(error));
    });
  }
};
