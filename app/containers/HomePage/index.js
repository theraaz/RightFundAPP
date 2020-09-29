
import React from 'react';
import './dashboard.scss';
import Layout from '../../components/Layout/index';
import MyCampaigns from '../../components/MyCampaigns/Loadable';

export default function HomePage({ children }) {
  const [activeCard, setActiveCard] = React.useState(0);
  const [campaignData, setCampaignData] = React.useState([]);

  return (
    <div>
      <Layout activeCard={activeCard}>
        <MyCampaigns setActiveCard={setActiveCard} setCampaignData={setCampaignData} />
      </Layout>

    </div>
  );
}
