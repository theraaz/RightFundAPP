/**
 *
 * Form3
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  Container,
  Input,
  Form,
} from 'react-bootstrap';
import './form3.scss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { CustomHeading, CustomHeadingNum, H4 } from '../form.styles';

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

const Form3 = ({ id, setActiveLink }) => {
  const [currency, setCurrency] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [showEnterPackaje, setShowEnterPackaje] = React.useState(false);
  const token = localStorage.getItem('token');

  const handleChange = event => {
    setSelectedCurrency(event.target.value);
  };
  useEffect(() => {
    console.log(id);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(`${process.env.baseURL}/currency`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        setCurrency(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });

    getAllPackages();
  }, []);

  function getAllPackages() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(`${process.env.baseURL}/package/compaign/${id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        console.log(user);
        setPackages(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function addPackaje() {
    console.log(id);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        amount: 12,
        amountSymbolId: selectedCurrency,
        description,
        title,
        compaignId: id,
      }),
    };

    fetch(`${process.env.baseURL}/package`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user);
        setShowEnterPackaje(false);
        getAllPackages();
        setTitle('');
        setDescription('');
        setAmount('');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="main-form1">
        <div className="main-heading">
          <H4>Campaign Packages</H4>
          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>

        <div className="mainForm">
          <Row>
            {packages.map(data => (
              <Col key={data.id} sm={6} style={{ marginBottom: '30px' }}>
                <Card className="defined-payments">
                  <div className="card-heading-inner">
                    <CustomHeading>{data.title}</CustomHeading>
                    <CustomHeadingNum>{data.amount}</CustomHeadingNum>
                  </div>
                  <div style={{ textAlign: 'initial' }}>
                    <p>{data.description}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <div>
            <Button
              className="addPackajeBtn"
              onClick={() => setShowEnterPackaje(true)}
            >
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 496 496"
              >
                <g>
                  <g>
                    <path d="M488,240H256V8c0-4.418-3.582-8-8-8s-8,3.582-8,8v232H8c-4.418,0-8,3.582-8,8s3.582,8,8,8h232v232c0,4.418,3.582,8,8,8s8-3.582,8-8V256h232c4.418,0,8-3.582,8-8S492.418,240,488,240z" />
                  </g>
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
              <span>Add Package</span>
            </Button>
          </div>

          {showEnterPackaje && (
            <div className="campaign-description">
              <div className="headingPackage">
                <H4 style={{ textAlign: 'initial', padding: '0px 15px' }}>
                  Add Package
                </H4>
              </div>
              <input
                required
                className="form-input description"
                placeholder="Title"
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <div className="formsDiv">
                <Select
                  labelId="demo-customized-select-label"
                  className="selectClass"
                  value={selectedCurrency || 1}
                  id="demo-customized-select"
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  {currency.map(data => (
                    <MenuItem value={data.id} key={data.id}>
                      {data.symbol}
                    </MenuItem>
                  ))}
                </Select>

                <input
                  required
                  className="form-input inputForm"
                  placeholder="Enter amount here"
                  type="number"
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                />
              </div>
              <textarea
                placeholder="Description"
                onChange={event => setDescription(event.target.value)}
                className="description"
                type="text"
              />

              <div style={{ textAlign: '-webkit-right', marginTop: '10px' }}>
                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Button className="saveBtn" onClick={addPackaje}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              textAlign: '-webkit-right',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            <div className="campaignBtns">
              <Button
                className="editCampaignBtn"
                onClick={() => setActiveLink(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="viewCampaignBtn"
                onClick={() => setActiveLink(3)}
              >
                Save and Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Form3.propTypes = {};

export default memo(Form3);
