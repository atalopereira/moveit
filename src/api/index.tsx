import axios from 'axios';

export async function getUserGitHub(id: number) {
  return await axios.get(`https://api.github.com/user/${id}`);
}

export async function createUser(username: string, name: string, id: number, host: string) {
  return await axios.post(`http://${host}/api/registerUsers`, { username, name, id })
};

export async function getUser(id: number, host: string) {
  return await axios.get(`http://${host}/api/getUsers`, { params: id });
}

export async function getAllUsers(host: string) {
  return await axios.get(`http://${host}/api/getAllUsers`);
}

export async function getUsersOrderXp(host: string) {
  return await axios.get(`http://${host}/api/getUsersOrderXp`);
}

export async function updateChallengesData(
  id: number,
  level = 0,
  experience = 0,
  challengesCompleted = 0,
  amount: number,
  host: string
){
  return await axios.post(`http://${host}/api/updateChallenges`, {
    id, level, experience, challengesCompleted, amount
  });
}

export async function getChallengesData(id: number, host: string) {
  return await axios.get(`http://${host}/api/getChallenges`, { params: id });
}

export async function setHistory(id: number, experience: number, host: string) {
  return await axios.post(`http://${host}/api/registerHistory`, { id, experience });
}
