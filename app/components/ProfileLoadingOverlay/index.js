import React from 'react';
import { Spinner } from 'react-bootstrap';

function ProfileLoadingOverlay() {
  return (
    <div
      className="d-flex align-items-center justify-content-center position-absolute"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '178px',
        height: '178px',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 0,
        borderRadius: '50%',
      }}
    >
      <Spinner animation="border" style={{ color: '#f15a24' }} />
    </div>
  );
}

export default ProfileLoadingOverlay;
