import axios from 'axios';
import keys from '../../util/keys';

export const useAwsS3 = () => {
  const uploadImageToS3 = async (image: File) => {
    try {
      // get aws s3 url to upload
      const uploadConfig = await axios.get('/api/upload');
      console.log('uploadConfig', uploadConfig);
      console.log(uploadConfig.data.url);

      // put data to aws s3
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          'Content-Type': image.type,
        },
      });

      const imageUrl = keys.AWS_S3_URL + uploadConfig.data.key;
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return { uploadImageToS3 };
};
