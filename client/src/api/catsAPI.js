import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/cats'

export const getAll = async () => {
   const result = await request.get(BASE_URL);
   const cats = Object.values(result);
   return cats;
};


export const getOne = (catId) => request.get(`${BASE_URL}/${catId}`);

export const create = (catData) => request.post(`${BASE_URL}`, catData);

const catsAPI = {
    getAll,
    getOne,
    create,
};

export default catsAPI;