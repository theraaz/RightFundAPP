import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}/campaign`;
export function getCampaigns(pages, pageNo, campaignSortBy) {
    return axios.get(CAMPAIGN_URL, { params: { perPage: pages, pageNo: pageNo, sortBy: campaignSortBy } });
}

export function deleteCampaigns(campaignId) {
    return axios.delete(`${CAMPAIGN_URL}/${campaignId}`);
}

export function changeCampaignStatus(campaignId, statusId) {
    console.log(statusId)
    return axios.put(`${CAMPAIGN_URL}/status/${campaignId}`,
        { statusId: statusId }

    );
}