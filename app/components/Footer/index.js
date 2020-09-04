/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Wrapper, Title } from './footer-styles';

function Footer() {
  return (
    <Wrapper>
      <Title>2020 Copyright Right Fund</Title>
    </Wrapper>
  );
}

Footer.propTypes = {};

export default memo(Footer);
