/**
 *
 * Form2
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Form2() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Form2.propTypes = {};

export default memo(Form2);
