import axios from 'axios';

export const getUserGitHub = axios.create({
  baseURL: 'https://api.github.com/users/'
});

export async function createUser(username: string, name: string, id: number) { 
  return await axios.post('http://localhost:3000/api/registerUsers', { username, name, id })
};

export async function getUser(id: number) {
  return await axios.get('http://localhost:3000/api/getUsers', { params: id });
}

export async function updateChallengesData(
  id: number,
  level = 0,
  experience = 0,
  challengesCompleted = 0,
  amount: number
){
  return await axios.post('http://localhost:3000/api/updateChallenges', {
    id, level, experience, challengesCompleted, amount
  });
}

export async function getChallengesData(id: number) {
  return await axios.get('http://localhost:3000/api/getChallenges', { params: id });
}

export async function getAllChallengesData() {
  return await axios.get('http://localhost:3000/api/getAllChallenges');
}
