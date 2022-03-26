import { FollowStorageService, UserStorageService } from '../application/ports';
import { useAuthContext } from './store';
import axios from 'axios';
import { keys } from '../presentation/util';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

// use interface to de-couple application layer and service layer
// application layer only use interface, don't care implementation of service layer
// application layer can keep independent from service using interface
export const useUserStorage = (): UserStorageService => {
  return useAuthContext() as UserStorageService;
};

export const useFollowStorage = () => {
  return useSelector((state: RootState) => state) as FollowStorageService;
};

export const useImageStorage = () => {
  const uploadImageToS3 = async (image: File) => {
    try {
      // get aws s3 url to upload
      const uploadConfig = await axios.get('/api/upload');

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

  return { uploadImage: uploadImageToS3 };
};
