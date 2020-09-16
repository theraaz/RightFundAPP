/**
 *
 * Form1
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ProgressBar, Form } from 'react-bootstrap/'


import './form1.scss';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import { H5, H4, Errors } from '../form.styles';



import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Field } from 'formik';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#f15a24',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


const BootstrapInput = withStyles((theme) => ({
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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));



const Form1 = ({ setFieldValue, values, errors, children, setActiveLink }) => {
  const classes = useStyles();

  const [currency, setCurrency] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleRadioChange = (event) => {
    setFieldValue('fundraiser', event.target.value);
  };


  const handleDateChange = (date) => {
    setFieldValue('date', date);
  };

  const handleChangeCategories = (event) => {
    setFieldValue('categories', event.target.value);
  };


  const handleChange = (event) => {
    setFieldValue('currencySymbol', event.target.value)
  };

  const validate = (values, props /* only available when using withFormik */) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    //...

    return errors;
  };


  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(`${process.env.baseURL}/currency`, requestOptions).then(response => response.json())
      .then(user => {
        if (user.statusCode == 200) {

        } else {
          setMessage('Something went missing, Please try again');

        }
        console.log(user.response.data.res)
        setCurrency(user.response.data.res)
      }).catch(error => {
        console.log(error)
      });;

    fetch(`${process.env.baseURL}/categories`, requestOptions).then(response => response.json())
      .then(user => {

        console.log(user.response.data.res)
        setCategories(user.response.data.res)
      }).catch(error => {
        console.log(error)
      });;

  }, []);



  return (
    <div>
      <div className='main-form1'>
        <div className='main-heading'>
          <H4>
            Campaign Information
      </H4>
          <p>Please enter your campaign information and proceed to the next step so we can build your campaign.</p>
        </div>
        <div className="mainForm">

          <Form.Group controlId="email" bssize="large">
            <div className='formGroup'>

              <H5 className='label-field'>Campaign Goal</H5>
              <div className="formsDiv">
                <Select
                  labelId="demo-customized-select-label"
                  className='selectClass'
                  id="demo-customized-select"
                  value={values.currencySymbol}
                  name='currencySymbol'
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {currency.map(data => (
                    <MenuItem value={data.id} key={data.id}>{data.symbol}</MenuItem>
                  ))}
                </Select>



                <Form.Control
                  className="form-input inputForm"
                  placeholder="Enter amount here"
                  type="number"
                  isInvalid={errors.amount}
                  value={values.amount}
                  name="amount"
                  onChange={(event) => setFieldValue('amount', event.target.value)}
                />

              </div>
            </div>
            {errors.amount && <div style={{ color: 'red' }} id="feedback">{errors.amount}</div>}
          </Form.Group>


          <Form.Group controlId="campaignTitle" bssize="large" style={{ position: 'relative' }}>


            <Form.Control
              type="text"
              isInvalid={errors.campaignTitle}
              value={values.campaignTitle}
              name="campaignTitle"
              placeholder="Campaign Title"
              className="inputForm"
              onChange={(event) => setFieldValue('campaignTitle', event.target.value)}
            />
            {errors.campaignTitle && <Errors id="feedback">{errors.campaignTitle}</Errors>}
          </Form.Group>
          <Form.Group controlId="address" bssize="large" style={{ position: 'relative' }}>

            <Form.Control
              type="text"
              isInvalid={errors.address}
              value={values.address}
              name="address"
              placeholder="Address"
              className="inputForm"
              onChange={(event) => setFieldValue('address', event.target.value)}
            />
            {errors.address && <Errors id="feedback">{errors.address}</Errors>}
          </Form.Group>

          <Form.Group bssize="large" style={{ position: 'relative' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >


              <KeyboardDatePicker
                fullWidth
                className="datePicker"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                disablePast
                isInvalid={errors.date}

                // inputVariant="outlined"
                placeholder="Campaign Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />


            </MuiPickersUtilsProvider>
            {errors.date && <Errors id="feedback">{errors.date}</Errors>}

          </Form.Group>

          <Form.Group controlId="categories" bssize="large" >

            <Select
              className="categoriesSelect"
              labelId="demo-customized-select-label"
              fullWidth
              style={{ textAlign: 'initial' }}
              name='categories'
              id="demo-customized-select"
              placeholder="Categories"
              // isInvalid={errors.categories}

              value={values.categories}
              onChange={handleChangeCategories}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map(data => (
                <MenuItem value={data.id} name={data.name} key={data.id}>{data.name}</MenuItem>
              ))}

            </Select>
            {errors.categories && <Errors id="feedback">{errors.categories}</Errors>}

          </Form.Group>

          <Form.Group controlId="radio-button-demo" bssize="large" style={{ textAlign: 'initial' }} >
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
                <span>Individual</span>
              </div>
              <div style={{ margin: '0 10px' }}>
                <GreenRadio
                  checked={selectedValue === 'b'}
                  onChange={handleRadioChange}

                  value="b"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'b' }}
                />
                <span>Charity</span>
              </div>
            </div>
          </Form.Group>
          <p style={{ textAlign: 'initial' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>

          <div style={{ textAlign: '-webkit-right', marginBottom: '10px' }}>
            <div className='campaignBtns'>

              {/* <Button className="editCampaignBtn" >Preview</Button> */}
              <Button type="submit" className="viewCampaignBtn" >Save and Continue</Button>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}

Form1.propTypes = {};

export default memo(Form1);