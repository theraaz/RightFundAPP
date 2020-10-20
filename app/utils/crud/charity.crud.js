import axios from 'axios';

export const CHARITY_URL = `${process.env.baseURL}/charity`;
export const CREATE_CHARITY_USER_URL = `${
  process.env.baseURL
}/createCharityUsers`;
export const GET_CHARITY_USER_URL = `${process.env.baseURL}/getCharityUsers`;
export const GET_ALL_MY_CHARITIES_URL = `${process.env.baseURL}/charitiesAll`;
export function getCharities() {
  return axios.get(CHARITY_URL);
}
export function updateCharity(data, id) {
  return axios.put(`${CHARITY_URL}/${id}`, data);
}
export function createCharityUser(data) {
  return axios.post(CREATE_CHARITY_USER_URL, data);
}

export function getAllMyCharities({ pageNo, perPage }) {
  return axios.get(GET_ALL_MY_CHARITIES_URL, { params: { pageNo, perPage } });
}
export function getCharityUsers(params) {
  return axios.get(GET_CHARITY_USER_URL, { params: params });
}
