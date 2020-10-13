import axios from 'axios';

export const LOGIN_URL = `${process.env.baseURL}/signin`;
export const ACCOUNT_URL = `${process.env.baseURL}/account`;
export const SIGNUP_URL = `${process.env.baseURL}/signup`;
export const Resend_Link = `${process.env.baseURL}/signupResendVerifyLink`;

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
