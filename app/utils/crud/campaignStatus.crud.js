import axios from 'axios';

export const CAMPAIGN_URL = `${process.env.baseURL}/campaignStatus`;
export function getCampaignsUpdates(id) {
    return axios.get(`${CAMPAIGN_URL}/campaign/${id}`);
}

export function deleteCampaignsUpdates(updateDataId) {
    return axios.delete(`${CAMPAIGN_URL}/${updateDataId}`);
}

export function campaignStatusUpdate(editorVal, statusId) {
    return axios.put(`${CAMPAIGN_URL}/${statusId}`,
        {
            description: editorVal,
        }

    );
}

export function campaignAddStatus(campaignID, editorVal) {
    return axios.post(`${CAMPAIGN_URL}`,
        {
            description: editorVal,
            campaignId: campaignID
        }

    );
}