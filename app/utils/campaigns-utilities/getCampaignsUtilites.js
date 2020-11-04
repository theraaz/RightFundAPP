import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}/parentCampaigns`;
export function getParentCampaigns(params) {
  console.log(params)
  return axios.get(`${CAMPAIGN_URL}`,{params});
}
