/**
 *
 * Form3
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { CustomHeading, CustomHeadingNum, H4 } from '../form.styles';
import { Row, Col, Card, Dropdown, Button, Container, Input, Form } from 'react-bootstrap/'
import './form3.scss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

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


function Form3() {
  return (
    <div>
      <div className='main-form1'>
        <div className='main-heading'>
          <H4>
            Campaign Packages
          </H4>
          <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
        </div>

        <div className='mainForm'>
          <Row>
            <Col sm={6}>
              <Card className='defined-payments'>
                <div className='card-heading-inner'>
                  <CustomHeading>Save one small family</CustomHeading>
                  <CustomHeadingNum>$ 106</CustomHeadingNum>
                </div>
                <div style={{ textAlign: 'initial' }}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className='defined-payments'>
                <div className='card-heading-inner'>
                  <CustomHeading>Save one large family</CustomHeading>
                  <CustomHeadingNum>$ 906</CustomHeadingNum>
                </div>
                <div style={{ textAlign: 'initial' }}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </Card>
            </Col>
          </Row>
          <div>
            <Button className='addPackajeBtn'>
              <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 496 496" ><g><g><path d="M488,240H256V8c0-4.418-3.582-8-8-8s-8,3.582-8,8v232H8c-4.418,0-8,3.582-8,8s3.582,8,8,8h232v232c0,4.418,3.582,8,8,8s8-3.582,8-8V256h232c4.418,0,8-3.582,8-8S492.418,240,488,240z" /></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
              <span>Add Packaje</span>
            </Button>
          </div>

          <div>
            
            <div className="formsDiv" >
              <Select
                labelId="demo-customized-select-label"
                className='selectClass'
                id="demo-customized-select"
                
                
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>$</MenuItem>
              </Select>



              <Input
                required
                className="form-input inputForm"
                placeholder="Enter amount here"
                type="number"

                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

Form3.propTypes = {};

export default memo(Form3);
