/**
 *
 * EmptyComponent
 *
 */

import React from 'react';

function EmptyComponent({ height = 200, message = '' }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height, fontSize: 20 }}
    >
      {message}
    </div>
  );
}

export default EmptyComponent;
