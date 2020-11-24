import axios from 'axios';

export const CAMPAIGNS_URL = `${process.env.baseURL}/campaign`;
export const CAMPAIGN_DONATIONS_URL = `${
  process.env.baseURL
}/donation/campaign`;
export const CAMPAIGNS_BASIC_URL = `${
  process.env.baseURL
}/campaignBasicDetails`;
export const ADMIN_CAMPAIGNS_URL = `${process.env.baseURL}/admin`;

export function createCampaign(data) {
  return axios.post(CAMPAIGNS_URL, data);
}
export function updateCampaign(data, id) {
  return axios.put(`${CAMPAIGNS_URL}/${id}`, data);
}

export function getCampaignBasicDetail(id) {
  return axios.get(`${CAMPAIGNS_BASIC_URL}/${id}`);
}

export function getCampaignById(id) {
  return axios.get(`${CAMPAIGNS_URL}/${id}`);
}
export function getAdminCampaignById(id) {
  return axios.get(`${ADMIN_CAMPAIGNS_URL}/campaign/${id}`);
}
export function getCampaignDonationsById(id, params) {
  return axios.get(`${CAMPAIGN_DONATIONS_URL}/${id}`, { params });
}
