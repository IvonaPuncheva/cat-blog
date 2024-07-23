import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/cats'

export const getAll = async () => {
   const result = await request.get(BASE_URL);
   const cats = Object.values(result);
   return cats;
};


