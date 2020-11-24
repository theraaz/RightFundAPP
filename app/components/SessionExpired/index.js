import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authActions } from '../../utils/action-creators/auth.action.creator';
import { charityActions } from '../../utils/action-creators/charity.action.creator';
const SessionExpired = ({ logout, isSessionExpired, resetCharityState }) => {
  const onClickLogOut = event => {
    event.preventDefault();
    logout();
    resetCharityState();
    localStorage.removeItem('token');
  };
  return (
    <Modal style={{ zIndex: 10000 }} show={isSessionExpired} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your session has expired, Please login again!</Modal.Body>
      <Modal.Footer>
        <Button
          style={{ background: '#f15a24', borderColor: '#f15a24' }}
          onClick={onClickLogOut}
        >
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = ({ auth }) => ({
  isSessionExpired: auth.isSessionExpired,
});
export default connect(
  mapStateToProps,
  { ...authActions, ...charityActions },
)(SessionExpired);
