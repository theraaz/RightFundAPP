import axios from 'axios';

const ADMIN_ACCOUNTS_URL = `${process.env.baseURL}/admin/accounts`;
const ADMIN_CAMPAIGNS_URL = `${process.env.baseURL}/admin/campaigns`;
const ADMIN_CAMPAIGN_BASIC_DETAILS_URL = `${
  process.env.baseURL
}/admin/campaignBasicDetails`;
const ADMIN_CAMPAIGN_DONATIONS_URL = `${
  process.env.baseURL
}/admin/campaignDonations`;
const ADMIN_FORCE_LOGIN_URL = `${process.env.baseURL}/admin/forceSignIn`;
const ADMIN_CHARITIES_URL = `${process.env.baseURL}/admin/charities`;
const ADMIN_CHARITY_BY_ID_URL = `${process.env.baseURL}/admin/charity`;
const ADMIN_CHARITY_USERS_URL = `${process.env.baseURL}/admin/charityUsers`;
const ADMIN_WITHDRAWALS_URL = `${process.env.baseURL}/admin/withdrawals`;
const ADMIN_WITHDRAWALS_STATUS_URL = `${
  process.env.baseURL
}/admin/withdrawalStatusUpdate`;
const ADMIN_SUSPEND_ACCOUNT_URL = `${
  process.env.baseURL
}/admin/accountStatusUpdate`;
const ADMIN_SUSPEND_CHARITY_URL = `${
  process.env.baseURL
}/admin/charityStatusUpdate`;
export function adminGetAllAccounts(params) {
  return axios.get(ADMIN_ACCOUNTS_URL, { params });
}
export function adminGetAllCampaigns() {
  return axios.get(ADMIN_CAMPAIGNS_URL);
}
export function adminGetCampaignById(id) {
  return axios.get(`${ADMIN_CAMPAIGNS_URL}/${id}`);
}
export function adminGetCampaignDonationsById(id, params) {
  return axios.get(`${ADMIN_CAMPAIGN_DONATIONS_URL}/${id}`, { params });
}
export function adminGetCampaignBasicDetails(id) {
  return axios.get(`${ADMIN_CAMPAIGN_BASIC_DETAILS_URL}/${id}`);
}
export function adminGetAllCharities() {
  return axios.get(ADMIN_CHARITIES_URL);
}

export function adminGetCharityById(id) {
  return axios.get(`${ADMIN_CHARITY_BY_ID_URL}/${id}`);
}

export function adminGetCharityUsers(id) {
  return axios.get(`${ADMIN_CHARITY_USERS_URL}/${id}`);
}

export function adminForceLogin(data) {
  return axios.post(ADMIN_FORCE_LOGIN_URL, data);
}

export function adminChangeAccountStatus(id, statusId) {
  return axios.post(`${ADMIN_SUSPEND_ACCOUNT_URL}/${id}`, { statusId });
}

export function adminChangeCharityStatus(id, statusId) {
  return axios.post(`${ADMIN_SUSPEND_CHARITY_URL}/${id}`, { statusId });
}
export function adminChangeWithdrawalStatus(id, statusId) {
  return axios.post(`${ADMIN_WITHDRAWALS_STATUS_URL}/${id}`, { statusId });
}

export function adminGetAllWithdrawals(params) {
  return axios.get(ADMIN_WITHDRAWALS_URL, { params });
}
