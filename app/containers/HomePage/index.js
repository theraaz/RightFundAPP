
import React from 'react';
import './dashboard.scss';
import Layout from '../../components/Layout/index';
import MyCampaigns from '../../components/MyCampaigns/Loadable';

export default function HomePage({ children }) {
  const [activeLink, setActiveLink] = React.useState(0)
  return (
    <div>

      
      <Layout>
        <MyCampaigns />
        
      </Layout>

    </div>
  );
}
