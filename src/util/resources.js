import axios from 'axios';

import { API_BASE } from 'src/config/constants';

// Resources for /posts endpoint on API
// @see https://github.com/mzabriskie/axios#creating-an-instance
export const postsResource = axios.create({
  baseURL: `${API_BASE}/posts/`
});

export const emailResource = axios.create({
  baseURL: `${API_BASE}/email/`
});

export const usersResource = axios.create({
  baseURL: 'https://api.khe.io/v1.0/users',
  timeout: 8000,
  //headers: {'X-Custom-Header': 'foobar'}
});
