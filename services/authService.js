import axios from 'axios';
import {API_URL} from '../constant';

export const login = async params => {
  console.log(params);
  const res = await axios.post(
    `${API_URL}/web/session/authenticate`,
    {
      jsonrpc: '2.0',
      params: {
        db: params.db,
        login: params.username,
        password: params.password,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (res?.data?.error) return null;
  const res2 = await axios.post(`${API_URL}/api/login`, {
    username: params.username,
    password: params.password,
  });

  if (res2?.data.success) {
    return res2.data.data;
  }
  return null;
};
