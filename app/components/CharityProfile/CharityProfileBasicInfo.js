import React from 'react';
import { Accordion, Col, FormGroup, Row } from 'react-bootstrap';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import Select from '@material-ui/core/Select';
import BootstrapInput from '../inputs/BootstrapInput';
import MenuItem from '@material-ui/core/MenuItem';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
const CharityProfileBasicInfo = ({
  isProfileCompleted,
  values,
  setFieldValue,
  selectedAccordion,
}) => (
  <>
    <Accordion.Toggle as={ToggleHeader} eventKey="0">
      <Heading>Basic Info</Heading>
      {selectedAccordion === '0' ? <ExpandLess /> : <ExpandMore />}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <>
        <Row>
          <Col md={6}>
            <label htmlFor="charityName">Charity Name</label>
            <FormGroup className="mb-3">
              <CustomTextInputFormik
                name="charityName"
                placeholder="Charity Name"
                disabled={isProfileCompleted}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <label htmlFor="regNo">Registration Number</label>
            <FormGroup className="mb-3">
              <CustomTextInputFormik
                name="regNo"
                placeholder="Registration Number"
                disabled={isProfileCompleted}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label htmlFor="position">Position</label>
            <FormGroup className="mb-3">
              <Select
                fullWidth
                className="selectClass"
                value={values.position}
                disabled={isProfileCompleted}
                onChange={event =>
                  setFieldValue('position', event.target.value)
                }
                input={<BootstrapInput />}
              >
                <MenuItem value="trustee">Trustee</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormGroup>
          </Col>
          <Col md={6}>
            <label htmlFor="charityWeb">Website</label>
            <FormGroup className="mb-3">
              <CustomTextInputFormik
                name="charityWeb"
                placeholder="Website"
                disabled={isProfileCompleted}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    </Accordion.Collapse>
  </>
);

export default CharityProfileBasicInfo;
