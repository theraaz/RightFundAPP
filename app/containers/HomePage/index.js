import React from 'react';
import './dashboard.scss';
import Layout from '../../components/Layout/index';
import MyCampaigns from '../../components/MyCampaigns';

export default function HomePage({ children }) {
  const [campaignData, setCampaignData] = React.useState([]);

  return (
    <Layout>
      <MyCampaigns setCampaignData={setCampaignData} />
    </Layout>
  );
}
