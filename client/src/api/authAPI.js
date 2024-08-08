import requester from "./requester"

const BASE_URL = 'http://localhost:3000/api/auth';

/**
 * 
 * @param {string} email 
 * @param {string} password 
 */

export const  login = (email, password) => requester.post(`${BASE_URL}/signin`, {email, password});



export const register = (username, email, password) =>requester.post(`${BASE_URL}/signup`, {username, email, password});


export const logout = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
            credentials: 'include', // Важно е за да се изпратят и получат кукитата
        });

        if (!response.ok) {
            throw new Error('Failed to log out');
        }

        console.log('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};