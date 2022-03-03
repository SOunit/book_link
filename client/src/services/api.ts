import axios from 'axios';
import keys from '../util/keys';

export const api = axios.create({
  baseURL: keys.GRAPHQL_REQUEST_URL,
  method: 'post',
});
