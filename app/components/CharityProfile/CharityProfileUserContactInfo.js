import React from 'react';
import { Accordion, Col, FormGroup, Row } from 'react-bootstrap';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const CharityProfileUserContactInfo = ({
  isProfileCompleted,
  selectedAccordion,
}) => (
  <>
    <Accordion.Toggle as={ToggleHeader} eventKey="1">
      <Heading>User Contact Info</Heading>
      {selectedAccordion === '1' ? <ExpandLess /> : <ExpandMore />}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Row>
        <Col md={6}>
          <label htmlFor="userFirstName">First Name</label>
          <FormGroup className="mb-3">
            <CustomTextInputFormik
              name="userFirstName"
              placeholder="First Name"
              disabled={isProfileCompleted}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <label htmlFor="userLastName">Last Name</label>
          <FormGroup className="mb-3">
            <CustomTextInputFormik
              name="userLastName"
              placeholder="Last Name"
              disabled={isProfileCompleted}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <label htmlFor="userEmail">Email</label>
          <FormGroup className="mb-3">
            <CustomTextInputFormik
              name="userEmail"
              placeholder="Email"
              type="email"
              disabled={isProfileCompleted}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <label htmlFor="userPhoneNumber">Phone Number</label>
          <FormGroup className="mb-3">
            <CustomTextInputFormik
              name="userPhoneNumber"
              placeholder="Phone Number"
              disabled={isProfileCompleted}
            />
          </FormGroup>
        </Col>
      </Row>
    </Accordion.Collapse>
  </>
);

export default CharityProfileUserContactInfo;
