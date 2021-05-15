import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com/users/'
});

export const apiUsers = (username: string) => { 
  return (axios.post('api/registerUsers', { username }))
};
