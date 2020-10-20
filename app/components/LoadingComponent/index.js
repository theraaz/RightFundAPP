/**
 *
 * LoadingComponent
 *
 */

import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingComponent({ height = 200 }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height, color: '#f15a24' }}
    >
      <Spinner animation={'border'} />
    </div>
  );
}

export default LoadingComponent;
