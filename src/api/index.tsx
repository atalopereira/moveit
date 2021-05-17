import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com/users/'
});

export const apiUsers = (username: string, name: string, id: number) => { 
  return (axios.post('api/registerUsers', { username, name, id }))
};

export async function getUser(username: string) {
  return await axios.get('api/getUsers', { params: username });
}
