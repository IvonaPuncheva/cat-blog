import requester from "./requester"

const BASE_URL = 'http://localhost:3000/api/auth';

/**
 * 
 * @param {string} email 
 * @param {string} password 
 */

export const  login = (email, password) => requester.post(`${BASE_URL}/signin`, {email, password});



export const register = (username, email, password) =>requester.post(`${BASE_URL}/signup`, {username, email, password});