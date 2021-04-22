import axios from 'axios';

export const CHARITY_URL = `${process.env.baseURL}/charity`;
export const CHARITY_USER_URL = `${process.env.baseURL}/charityUser`;
export const CHARITY_TRUSTEE_URL = `${process.env.baseURL}/trustee`;
export const GET_ALL_MY_CHARITIES_URL = `${process.env.baseURL}/charitiesAll`;
export function getCharities() {
  return axios.get(CHARITY_URL);
}
export function updateCharity(data, id) {
  return axios.put(`${CHARITY_URL}/${id}`, data);
}
export function createCharityUser(data) {
  return axios.post(CHARITY_USER_URL, data);
}
export function deleteCharityUser(params) {
  return axios.delete(CHARITY_USER_URL, { params });
}

export function getAllMyCharities({ pageNo, perPage, q }) {
  return axios.get(GET_ALL_MY_CHARITIES_URL, { params: { pageNo, perPage, q } });
}
export function getCharityUsers(params) {
  return axios.get(CHARITY_USER_URL, { params: params });
}
export function createCharityTrustee(data) {
  return axios.post(CHARITY_TRUSTEE_URL, data);
}
export function updateCharityTrustee(data, id) {
  return axios.put(`${CHARITY_TRUSTEE_URL}/${id}`, data);
}
export function deleteCharityTrustee(params) {
  return axios.delete(CHARITY_TRUSTEE_URL, { params: params });
}
