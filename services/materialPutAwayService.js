import {api} from '../utils';

export const getAll = params => {
  return api.get(`/stock-picking/get-put-away`, {
    data: null,
    params: params,
  });
};
