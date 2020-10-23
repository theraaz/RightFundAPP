import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Col,
  FormGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { ExpandLess, ExpandMore, MoreVert } from '@material-ui/icons';
import EmptyComponent from '../EmptyComponent';
import { Formik } from 'formik';
import { connect, shallowEqual, useSelector } from 'react-redux';
import {
  createCharityTrustee,
  deleteCharityTrustee,
  updateCharityTrustee,
} from '../../utils/crud/charity.crud';
import { useSnackbar } from 'notistack';
import { charityActions } from '../../utils/action-creators/charity.action.creator';
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import DeleteIcon from '../svg-icons/DeleteIcon';
import PencilIcon from '../svg-icons/PencilIcon';

const CharityProfileTrusteeContactInfo = ({
  selectedAccordion,
  addCharityTrustee,
  removeCharityTrustee,
  ...props
}) => {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [currentTrustee, setCurrentTrustee] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [edit, setEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const enableLoading = name => {
    setLoading({ ...loading, [name]: true });
  };
  const disableLoading = name => {
    setLoading({ ...loading, [name]: false });
  };
  const handleSubmit = (values, { resetForm }) => {
    enableLoading('save');
    const apiCall = edit ? updateCharityTrustee : createCharityTrustee;
    apiCall({ ...values, charityId: myCharityProfile.id }, currentTrustee?.id)
      .then(({ data }) => {
        disableLoading('save');
        showAlert('success', data.response?.message);

        if (edit) {
          setEdit(false);
          props.updateCharityTrustee({ ...values, id: currentTrustee.id });
          resetForm({});
          setCurrentTrustee(null);
        } else {
          addCharityTrustee(data.response?.data);
          resetForm({});
        }
      })
      .catch(error => {
        disableLoading('save');
        showAlert(
          'error',
          error.response.data?.response?.message ||
            `Could not ${edit ? 'update' : 'add'} trustee!`,
        );
      });
  };
  const openModal = () => {
    setShowModal(true);

    setAnchorEl(null);
  };
  const closeModal = () => {
    setCurrentTrustee(null);
    setShowModal(false);
  };
  const handleClickMenuOpen = trustee => e => {
    setActiveKey(null);
    setEdit(false);
    setAnchorEl(e.currentTarget);
    setCurrentTrustee(trustee);
  };
  const toggleTrusteeDetails = () => {
    setEdit(false);
    setCurrentTrustee(null);
    setActiveKey(prevValue => (prevValue && !edit ? null : '0'));
  };
  const onClickEditTrustee = () => {
    setAnchorEl(null);
    setEdit(true);
    setActiveKey('0');
  };

  const deleteTrustee = () => {
    enableLoading('delete');
    deleteCharityTrustee({
      id: currentTrustee.id,
      charityId: myCharityProfile.id,
    })
      .then(({ data, status }) => {
        disableLoading('delete');

        if (status === 200) {
          showAlert('success', data.response.message);
          removeCharityTrustee(currentTrustee.id);
          closeModal();
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('delete');

        showAlert(
          'error',
          error?.response?.data?.response?.message ||
            'Could not remove trustee!',
        );
      });
  };
  return (
    <>
      <Accordion.Toggle as={ToggleHeader} eventKey="2">
        <Heading>Trustee Contact Info</Heading>
        {selectedAccordion === '2' ? <ExpandLess /> : <ExpandMore />}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="2">
        <>
          <div className="tableMain mb-3">
            <Table responsive size="sm" className="table1">
              <thead className="tableHeader">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  {myCharityProfile?.trustees?.length > 0 && <th>Actions</th>}
                </tr>
              </thead>
              <tbody className="tableBody">
                {myCharityProfile?.trustees?.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <EmptyComponent
                        height={60}
                        message="No Trustees Found!"
                      />
                    </td>
                  </tr>
                ) : (
                  myCharityProfile?.trustees?.map((trustee, i) => (
                    <tr key={i}>
                      <td>{trustee.firstName}</td>
                      <td>{trustee.lastName}</td>
                      <td>{trustee.email}</td>
                      <td>{trustee.phoneNumber}</td>
                      <td>
                        <button
                          onClick={handleClickMenuOpen(trustee)}
                          className="btn btn-icon "
                          type="button"
                        >
                          <MoreVert fontSize="small" />
                        </button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem
                            className="menuList"
                            onClick={onClickEditTrustee}
                          >
                            <PencilIcon size="16px" />
                            <ListItemText
                              primary="Edit Trustee"
                              style={{ marginLeft: 10 }}
                            />
                          </MenuItem>
                          <MenuItem className="menuList" onClick={openModal}>
                            <DeleteIcon />
                            <ListItemText
                              primary="Delete Trustee"
                              style={{ marginLeft: 10 }}
                            />
                          </MenuItem>
                        </Menu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <Accordion activeKey={activeKey}>
            <Accordion.Toggle
              as={props => (
                <div className="d-flex align-items-center justify-content-end">
                  <Button {...props} size="sm" />
                </div>
              )}
              eventKey="0"
              onClick={toggleTrusteeDetails}
            >
              Add Trustee
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Formik
                initialValues={{
                  firstName: currentTrustee?.firstName || '',
                  lastName: currentTrustee?.lastName || '',
                  email: currentTrustee?.email || '',
                  phoneNumber: currentTrustee?.phoneNumber || '',
                }}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <label htmlFor="trusteeFirstName">First Name</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="firstName"
                            placeholder="First Name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteeLastName">Last Name</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="lastName"
                            placeholder="Last Name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteeEmail">Email</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="email"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteePhoneNumber">Phone Number</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="phoneNumber"
                            placeholder="Phone Number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="d-flex align-items-center justify-content-end">
                      <Button
                        disabled={
                          !values.firstName &&
                          !values.lastName &&
                          !values.email &&
                          !values.phoneNumber
                        }
                        type="submit"
                        size="sm"
                      >
                        {edit ? 'Save' : 'Create'}
                        {loading.save && (
                          <Spinner animation="border" size="sm" />
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </Accordion.Collapse>
          </Accordion>
        </>
      </Accordion.Collapse>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Trustee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this trustee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={deleteTrustee}>
            Delete Now{' '}
            {loading.delete && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(
  null,
  charityActions,
)(CharityProfileTrusteeContactInfo);
