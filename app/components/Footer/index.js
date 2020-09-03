/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Wrapper } from './footer-styles';

function Footer() {
  return (
    <Wrapper>
      <h5>2020 Copyright Right Fund</h5>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
