import axios from 'axios';
import { keys } from '../presentation/util';

export const api = axios.create({
  baseURL: keys.GRAPHQL_REQUEST_URL,
  method: 'post',
});
