import axios from 'axios';

export const WITHDRAWAL_URL = `${process.env.baseURL}/withdrawal`;
export function createWithdrawal(data) {
  return axios.post(WITHDRAWAL_URL, data);
}
export function getWithdrawal() {
  return axios.get(WITHDRAWAL_URL);
}

export function getWithdrawalHistory(params) {
  return axios.get(`${WITHDRAWAL_URL}History`, { params });
}
