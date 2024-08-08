import requester from "./requester"

const BASE_URL = 'http://localhost:3000/jsonstore/cats/'

const buildUrl = (catId) => `${BASE_URL}/${catId}/comments`;
const create = async (catId, username, text) => requester.post(buildUrl(catId), { catId, username, text });

const getAll = async(catId) => {
  const result = await requester.get(buildUrl(catId));

    const comments = Object.values(result);

    return comments;
};

const commentsAPI = {
    create,
    getAll
}

export default commentsAPI;

