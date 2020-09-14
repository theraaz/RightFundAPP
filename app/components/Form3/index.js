/**
 *
 * Form3
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Form3() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Form3.propTypes = {};

export default memo(Form3);
