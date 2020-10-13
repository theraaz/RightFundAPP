
import React from 'react';
import './dashboard.scss';
import Layout from '../../components/Layout/index';
import MyCampaigns from '../../components/MyCampaigns/index';

export default function HomePage({ children }) {
  const [campaignData, setCampaignData] = React.useState([]);

  return (
    <div>
      <Layout>
        <MyCampaigns setCampaignData={setCampaignData} />
      </Layout>

    </div>
  );
}
