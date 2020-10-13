import axios from 'axios';

export const CHARITY_URL = `${process.env.baseURL}/charity`;
export function getCharities() {
  return axios.get(CHARITY_URL);
}
export function updateCharity(data, id) {
  return axios.put(`${CHARITY_URL}/${id}`, data);
}
