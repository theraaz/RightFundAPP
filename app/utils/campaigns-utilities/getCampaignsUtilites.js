import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}`;


export function getParentCampaigns(params) {
  return axios.get(`${CAMPAIGN_URL}/parentCampaigns`, { params });
}

export function getSubCampaigns(id) {
  return axios.get(`${CAMPAIGN_URL}/subCampaigns/${id}`);
}
