/**
 *
 * CharityProfileView
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import CharityLayout from '../../components/CharityLayout';

export function CharityProfileView() {
  return (
    <CharityLayout>
      <Helmet>
        <title>Charity Profile</title>
        <meta name="description" content="Description of CharityProfileView" />
      </Helmet>
    </CharityLayout>
  );
}

export default CharityProfileView;
