import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/cats'

export const getAll = async () => {
   const result = await request.get(BASE_URL);
   const cats = Object.values(result);
   return cats;
};


export const getOne = (catId) => request.get(`${BASE_URL}/${catId}`);

const catsAPI = {
    getAll,
    getOne,

};

export default catsAPI;