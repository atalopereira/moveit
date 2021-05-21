import axios from 'axios';

export const getUserGitHub = axios.create({
  baseURL: 'https://api.github.com/users/'
});

export const apiUsers = (username: string, name: string, id: number) => { 
  return (axios.post('api/registerUsers', { username, name, id }))
};

export async function getUser(username: string) {
  return await axios.get('api/getUsers', { params: username });
}

export async function createChallengesData(
  id: number,
  level = 0,
  experience = 0,
  challengesCompleted = 0
){
  return await axios.post('api/insertChallenges', { id, level, experience, challengesCompleted});
}

export async function updateChallengesData(
  id: number,
  level = 0,
  experience = 0,
  challengesCompleted = 0
){
  return await axios.post('api/updateChallenges', { id, level, experience, challengesCompleted});
}
