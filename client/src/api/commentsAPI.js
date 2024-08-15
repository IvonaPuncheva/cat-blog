import requester from "./requester"

const BASE_URL = 'http://localhost:3000/api/comments';

const create = (catId, email, text) => 
  requester.post(`${BASE_URL}/${catId}`, { catId, email, text });

const getAll = (catId) => {
  const params = new URLSearchParams({
    where: `catId="${catId}"`,
    load: `author=_ownerId:users`
  });
  return requester.get(`${BASE_URL}?${params.toString()}`);
};

const commentsAPI = {
    create,
    getAll
};

export default commentsAPI;
