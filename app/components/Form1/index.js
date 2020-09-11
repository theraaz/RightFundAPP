/**
 *
 * Form1
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ProgressBar, Form } from 'react-bootstrap/'

import { FormattedMessage } from 'react-intl';
import './form1.scss';

import { Formik } from 'formik';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import { H5, H4 } from './form1.styles';



import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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



const Form1 = ({ children }) => {
  const classes = useStyles();

  const [age, setAge] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleChange = (event) => {
    setAge(event.target.value);
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





  return (
    <div>
      <div className='main-form1'>
        <div className='main-heading'>
          <H4>
            Campaign Information
      </H4>
          <p>Please enter your campaign information and proceed to the next step so we can build your campaign.</p>
        </div>
        <Formik
          initialValues={{ value: '', currency: '$ USD', date: new Date() }}
          validate={validate}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <div className="mainForm">

                <Form.Group controlId="email" bssize="large" className='formGroup'>
                  <H5 className='label-field'>Campaign Goal</H5>
                  <div className="formsDiv" >
                    <Select
                      labelId="demo-customized-select-label"
                      className='selectClass'
                      id="demo-customized-select"
                      value={age}
                      onChange={handleChange}
                      input={<BootstrapInput />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>



                    <Form.Control
                      required
                      className="form-input inputForm"
                      placeholder="Enter amount here"
                      type="text"

                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </Form.Group>


                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>


                  <Form.Control
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.title}
                    name="title"
                    placeholder="Campaign Title"
                    className="inputForm"
                  />
                  {props.errors.title && <div id="feedback">{props.errors.title}</div>}
                </Form.Group>
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>

                  <Form.Control
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.address}
                    name="address"
                    placeholder="Address"
                    className="inputForm"
                  />
                  {props.errors.address && <div id="feedback">{props.errors.address}</div>}
                </Form.Group>
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >


                    <KeyboardDatePicker
                      fullWidth
                      className="datePicker"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      inputVariant="outlined"
                      placeholder="Campaign Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />


                  </MuiPickersUtilsProvider>
                </Form.Group>

                <Form.Group controlId="email" bssize="large" >

                  <Select
                    className="categoriesSelect"
                    labelId="demo-customized-select-label"
                    fullWidth
                    inputVariant="outlined"
                    id="demo-customized-select"
                    placeholder="Categories"
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Form.Group>

                <Form.Group controlId="email" bssize="large" style={{ textAlign: 'initial' }} >
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

                <div style={{ textAlign: '-webkit-right' }}>
                  <div className='campaignBtns'>

                    <Button className="editCampaignBtn" >Preview</Button>
                    <Button type="submit" className="viewCampaignBtn" >Save</Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div >
  );
}

Form1.propTypes = {};

export default memo(Form1);
