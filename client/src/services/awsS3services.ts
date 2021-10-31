import API from './api';
import axios from 'axios';

const awsS3services = {
  getUrl: async () => {
    const graphqlQuery = ``;
    return await API({ data: graphqlQuery });
  },

  uploadImage: async (uploadConfig: any, file: any) => {
    // put data to aws s3
    return await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },
};

export default awsS3services;
