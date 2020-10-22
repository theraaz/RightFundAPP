import axios from 'axios';

export const BANKDETAIL_URL = `${process.env.baseURL}/bankDetail`;

export function getBankDetails() {
    return axios.get(`${BANKDETAIL_URL}/account`);
}

export function getBankDetailsByCharityId(id) {
    return axios.get(`${BANKDETAIL_URL}/charity/${id}`);
}

export function addBankDetails(accountName, sortCode, accountNo, charityId) {
    return axios.post(BANKDETAIL_URL, {
        accountName: accountName,
        sortCode: sortCode,
        accountNo: accountNo,
        charityId: charityId
    });
}

export function updateBankDetails(id, accountName, sortCode, accountNo) {
    return axios.put(`${BANKDETAIL_URL}/${id}`, {
        accountName: accountName,
        sortCode: sortCode,
        accountNo: accountNo
    });
}


