import axios from 'axios';

export const CAMPAIGNS_URL = `${process.env.baseURL}/campaign`;
export function createCampaign(data) {
  return axios.post(CAMPAIGNS_URL, data);
}
export function updateCampaign(data, id) {
  return axios.put(`${CAMPAIGNS_URL}/${id}`, data);
}
