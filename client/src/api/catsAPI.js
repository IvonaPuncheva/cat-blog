import * as request from './requester.js';

const BASE_URL = 'http://localhost:3000/api/cats';

export const getAll = async () => {
   const result = await request.get(BASE_URL);
   const cats = Object.values(result);
   return cats;
};


export const getOne = (catId) => request.get(`${BASE_URL}/${catId}`);

export const create = (catData) => request.post(`${BASE_URL}/create`, catData);

export const edit = async (catId, data) => {
    const response = await request.put(`${BASE_URL}/details/edit/${catId}`, data);

    return response;
}

export const remove = (catId) => request.del(`${BASE_URL}/${catId}`);

const catsAPI = {
    getAll,
    getOne,
    create,
    remove,
    edit,
};

export default catsAPI;