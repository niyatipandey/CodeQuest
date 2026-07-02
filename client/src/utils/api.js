export const API_URL = "https://codequest-noly.onrender.com";

export const getAuthHeader = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})