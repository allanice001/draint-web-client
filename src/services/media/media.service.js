import axiosOriginal from 'axios';

/**
 * Upload media file with presigned url
 * @param {File} file - Media image file
 * @param {String} presignedUrl - AWS S3 presigned url
 * @return {Promise<void>}
 */
export const uploadMediaFileViaSignedUrl = async (file, presignedUrl) => {
  try {
    return await axiosOriginal.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type || 'image/jpeg',
        'x-amz-acl': 'public-read',
      },
    });
  } catch {
    throw new Error('Media upload was fail');
  }
};
