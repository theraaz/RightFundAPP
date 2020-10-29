import axios from 'axios';

const ADMIN_ACCOUNTS_URL = `${process.env.baseURL}/admin/accounts`;
const ADMIN_CAMPAIGNS_URL = `${process.env.baseURL}/admin/campaigns`;
const ADMIN_FORCE_LOGIN_URL = `${process.env.baseURL}/admin/forceSignIn`;
const ADMIN_CHARITIES_URL = `${process.env.baseURL}/admin/charities`;
export function adminGetAllAccounts(params) {
  return axios.get(ADMIN_ACCOUNTS_URL, { params });
}
export function adminGetAllCampaigns() {
  return axios.get(ADMIN_CAMPAIGNS_URL);
}
export function adminGetCampaignById(id) {
  return axios.get(`${ADMIN_CAMPAIGNS_URL}/${id}`);
}
export function adminGetAllCharities() {
  return axios.get(ADMIN_CHARITIES_URL);
}

export function adminForceLogin(data) {
  return axios.post(ADMIN_FORCE_LOGIN_URL, data);
}
