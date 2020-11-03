import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}/campaign`;
export const CAMPAIGN_ADMIN_URL = `${process.env.baseURL}/admin`;

export function getCampaigns(pages, pageNo, campaignSortBy) {
    return axios.get(CAMPAIGN_URL, { params: { perPage: pages, pageNo: pageNo, sortBy: campaignSortBy } });
}

export function getAdminCampaigns(pages, pageNo, campaignSortBy) {
    return axios.get(`${CAMPAIGN_ADMIN_URL}/campaigns`, { params: { perPage: pages, pageNo: pageNo, sortBy: campaignSortBy } });
}

export function deleteCampaigns(campaignId) {
    return axios.delete(`${CAMPAIGN_URL}/${campaignId}`);
}

export function changeCampaignStatus(campaignId, statusId) {
    return axios.put(`${CAMPAIGN_URL}/status/${campaignId}`,
        { statusId: statusId }

    );
}

export function suspendCampaign(campaignId, statusId) {
    return axios.post(`${CAMPAIGN_ADMIN_URL}/campaignStatusUpdate/${campaignId}`,
        { statusId: statusId }

    );
}