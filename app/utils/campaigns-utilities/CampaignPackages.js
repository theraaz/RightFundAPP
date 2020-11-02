import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}/package/campaign/`;
export function getCampaignPackages(id) {
  return axios.get(`${CAMPAIGN_URL}${id}`);
}
