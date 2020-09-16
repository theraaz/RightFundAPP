
import React from 'react';
import Header from '../../components/Header/Loadable';
import Footer from '../../components/Footer/Loadable';
import './dashboard.scss';
import Layout from '../../components/Layout/index';
import MyCampaigns from '../../components/MyCampaigns/Loadable';

export default function HomePage({ children }) {
  const [activeLink, setActiveLink] = React.useState(0)
  return (
    <div>

      <Header title="Dasboard" />
      <Layout>
        <MyCampaigns />
      </Layout>
      <Footer></Footer>

    </div>
  );
}
