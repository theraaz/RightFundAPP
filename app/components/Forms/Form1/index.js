/**
 *
 * Form1
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Row,
  Col,
  Card,
  ListGroup,
  Dropdown,
  Button,
  Container,
  Spinner,
  Form,
} from 'react-bootstrap/';

import './form1.scss';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Field } from 'formik';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { H5, H4, Errors } from '../form.styles';
import Address from '../../Address/Loadable';

const GreenRadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#f15a24',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    // borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      // borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Form1 = ({ setFieldValue, values, errors, children, setActiveLink, loading }) => {
  const classes = useStyles();

  const [currency, setCurrency] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('a');


  const handleRadioChange = event => {
    setFieldValue('fundraiser', event.target.value);
  };

  const handleDateChange = date => {
    setFieldValue('date', date);
  };

  const handleChangeCategories = event => {
    setFieldValue('categories', event.target.value);
  };

  const handleChange = event => {
    console.log(event.target.value)
    setFieldValue('currencySymbol', event.target.value);
  };

  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    // ...

    return errors;
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${process.env.baseURL}/currency`, requestOptions)
      .then(response => response.json())
      .then(user => {
        if (user.statusCode == 200) {
        } else {
          setMessage('Something went missing, Please try again');
        }
        console.log(user.response.data.res);
        setCurrency(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });

    fetch(`${process.env.baseURL}/category`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        setCategories(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="main-form1">
        <div className="main-heading">
          <H4>Campaign Information</H4>
          <p style={{ color: '#9c9c9c' }}>
            Please enter your campaign information and proceed to the next step
            so we can build your campaign.
          </p>
        </div>
        <div className="mainForm">
          <Form.Group controlId="email" bssize="large">
            <Row>
              <Col sm={3}>
                <H5 className="label-field" style={{ marginTop: '13px' }}>
                  Campaign Goal
                </H5>
              </Col>
              <Col sm={9}>
                <Row>
                  <div className="formsDiv">
                    <Col sm={2} className="pl-0 pr-0 selection-col-div">
                      <Select
                        labelId="demo-customized-select-label"
                        className="selectClass"
                        id="demo-customized-select"
                        value={values.currencySymbol || 1}
                        name="currencySymbol"
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        {currency.map(data => (
                          <MenuItem value={data.id} key={data.id}>
                            {data.symbol}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>

                    <Col sm={10} className="p-0">
                      <Form.Control
                        className="form-input inputForm"
                        placeholder="Enter amount here"
                        type="number"
                        isInvalid={errors.amount}
                        value={values.amount}
                        name="amount"
                        onChange={event =>
                          setFieldValue('amount', event.target.value)
                        }
                      />
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>

            {errors.amount && (
              <div style={{ color: 'red' }} id="feedback">
                {errors.amount}
              </div>
            )}
          </Form.Group>

          <Form.Group
            controlId="campaignTitle"
            bssize="large"
            style={{ position: 'relative' }}
          >
            <Form.Control
              type="text"
              isInvalid={errors.campaignTitle}
              value={values.campaignTitle}
              name="campaignTitle"
              placeholder="Campaign Title"
              className="controlForm"
              onChange={event =>
                setFieldValue('campaignTitle', event.target.value)
              }
            />
            {errors.campaignTitle && (
              <Errors id="feedback">{errors.campaignTitle}</Errors>
            )}
          </Form.Group>
          <Form.Group
            controlId="address"
            bssize="large"
            style={{ position: 'relative' }}
          >
            <Form.Control
              type="text"
              isInvalid={errors.address}
              value={values.address}
              name="address"
              placeholder="Address"
              className="controlForm"
              onChange={event => setFieldValue('address', event.target.value)}
            />
            {/* <Address setFieldValue={setFieldValue}/> */}
            {errors.address && <Errors id="feedback">{errors.address}</Errors>}
          </Form.Group>

          <Form.Group bssize="large" style={{ position: 'relative' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                className="datePicker"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                disablePast
                // isInvalid={errors.date}
                // inputVariant="outlined"
                placeholder="Campaign end date"
                value={values.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {errors.date && <Errors id="feedback">{errors.date}</Errors>}
          </Form.Group>

          <Form.Group controlId="categories" bssize="large">
            <Select
              className="categoriesSelect"
              labelId="demo-customized-select-label"
              fullWidth
              style={{ textAlign: 'initial' }}
              name="categories"
              id="demo-customized-select"
              placeholder="Categories"
              // isInvalid={errors.categories}
              value={values.categories || -1}
              onChange={handleChangeCategories}
              input={<BootstrapInput />}
            >
              <MenuItem value={-1} disabled>
                <span style={{ color: '#9c9c9c' }}>Categories</span>
              </MenuItem>
              {categories.map(data => (
                <MenuItem
                  value={data.id || -1}
                  name={data.name}
                  key={data.id || -1}
                >
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categories && (
              <Errors id="feedback">{errors.categories}</Errors>
            )}
          </Form.Group>

          <Form.Group
            controlId="radio-button-demo"
            bssize="large"
            style={{ textAlign: 'initial' }}
          >
            <div>Fundraiser as:</div>
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '0 10px' }}>
                <GreenRadio
                  checked={selectedValue === 'a'}
                  onChange={handleRadioChange}
                  value="a"
                  name="radio-button-demo"
                  label="Individual"
                  inputProps={{ 'aria-label': 'a' }}
                />
                <span style={{ color: '#9d9d9d' }}>Individual</span>
              </div>
              <div style={{ margin: '0 10px' }}>
                <GreenRadio
                  checked={selectedValue === 'b'}
                  onChange={handleRadioChange}
                  value="b"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'b' }}
                />
                <span style={{ color: '#9d9d9d' }}>Charity</span>
              </div>
            </div>
          </Form.Group>
          <p style={{ textAlign: 'initial', color: '#9c9c9c' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>

          <div style={{ textAlign: '-webkit-right', marginBottom: '20px' }}>
            <div className="campaignBtns">
              {/* <Button className="editCampaignBtn" >Preview</Button> */}
              <Button type="submit" className="viewCampaignBtn">
                {' '}
                {loading == false && <div> Save and Continue</div>}
                {loading && <Spinner animation="border" size="sm" />}{' '}

              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Form1.propTypes = {};

export default memo(Form1);
