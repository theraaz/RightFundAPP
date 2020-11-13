import axios from 'axios';

export const BANKDETAIL_URL = `${process.env.baseURL}/bankDetail`;

export function getBankDetails() {
    return axios.get(`${BANKDETAIL_URL}/account`);
}

export function getBankDetailsByCharityId(id) {
    return axios.get(`${BANKDETAIL_URL}/charity/${id}`);
}

export function addBankDetails() {
    return axios.post(BANKDETAIL_URL);
}

export function updateBankDetails(id) {
    return axios.put(`${BANKDETAIL_URL}/${id}`);
}


