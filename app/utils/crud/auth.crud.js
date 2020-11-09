import axios from 'axios';

export const LOGIN_URL = `${process.env.baseURL}/signin`;
export const ACCOUNT_URL = `${process.env.baseURL}/account`;
export const SIGNUP_URL = `${process.env.baseURL}/signup`;
export const Resend_Link = `${process.env.baseURL}/signupResendVerifyLink`;
export const ACCOUNT_DETAILS_URL = `${process.env.baseURL}/accountDetails`;
export const ADMIN_ACCOUNT_DETAILS_URL = `${process.env.baseURL}/admin/allCampaignDetails`;
export const CHARITY_ACCOUNT_DETAILS_URL = `${
  process.env.baseURL
}/charityAccountDetails`;

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}
export function updateProfile(data) {
  return axios.put(ACCOUNT_URL, data);
}
export function signUp(data) {
  return axios.post(SIGNUP_URL, data);
}
export function resendVerifyLink(data) {
  return axios.post(Resend_Link, data);
}

export function getAccountDetails() {
  return axios.get(ACCOUNT_DETAILS_URL);
}

export function getAllAccountDetails() {
  return axios.get(ADMIN_ACCOUNT_DETAILS_URL);
}

export function getCharityAccountDetails(charityId) {
  return axios.get(`${CHARITY_ACCOUNT_DETAILS_URL}/${charityId}`);
}
