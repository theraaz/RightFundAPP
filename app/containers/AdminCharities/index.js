/**
 *
 * AdminCharities
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout/index';
import '../HomePage/dashboard.scss';
import '../../components/CampaignDonations/campaignDontaions.scss';
import CharitiesList from '../../components/CharitiesList';
export function AdminCharities() {
  return (
    <Layout>
      <Helmet>
        <title>Charities</title>
        <meta name="description" content="Description of AdminCharities" />
      </Helmet>
      <CharitiesList type={'list'} />
    </Layout>
  );
}

export default AdminCharities;
