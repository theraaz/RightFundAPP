import React from 'react';
import { Helmet } from 'react-helmet';
import '../HomePage/dashboard.scss';
import '../../components/CampaignDonations/campaignDontaions.scss';
import Layout from '../../components/Layout';
import CharitiesList from '../../components/CharitiesList';
export function TeamsMembers() {
  return (
    <Layout>
      <Helmet>
        <title>Team Members</title>
        <meta name="description" content="Description of TeamsMembers" />
      </Helmet>
      <CharitiesList type={'team'} />
    </Layout>
  );
}

export default TeamsMembers;
