import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}`;


export function getCharities(params) {
  return axios.get(`${CAMPAIGN_URL}/charitiesAll`, { params });
}
