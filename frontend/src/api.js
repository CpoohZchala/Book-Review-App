import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/reviews' });

export const fetchReviews = () => API.get('/');
export const createReview = (newReview) => API.post('/', newReview);
export const updateReview = (id, updatedReview) => API.patch(`/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/${id}`);
