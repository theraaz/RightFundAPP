/**
 *
 * Form3
 *
 */

import React, { memo, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './form3.scss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Menu from '@material-ui/core/Menu';
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
  const [amount, setAmount] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [selectedCurrency, setSelectedCurrency] = React.useState(1);
  const [showEnterPackaje, setShowEnterPackaje] = React.useState(false);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editPackage, setEditPackage] = React.useState(false);
  const [packageId, setPackageId] = React.useState(null);
  const [packageData, setPackageData] = React.useState(null);

  const handleClick = data => event => {
    setAnchorEl(event.currentTarget);
    setPackageData(data);
  };

  const handleChange = event => {
    setSelectedCurrency(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(id)

  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };



  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        console.log(user.response.data.res);
        setCurrency(user.response.data.res);
      })
      .catch(error => {
        setLoading(false);
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
    setLoading(true);

    fetch(`${process.env.baseURL}/package/campaign/${id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        console.log(user);
        setPackages(user.response.data.res);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function resetValue() {
    setShowEnterPackaje(false);
    getAllPackages();
    setTitle('');
    setDescription('');
    setAmount('');
    setPackageId('');
  }

  function addPackaje() {
    if (editPackage) {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          amount: JSON.parse(amount),
          amountSymbolId: selectedCurrency,
          description,
          title,
          campaignId: id,
        }),
      };

      fetch(`${process.env.baseURL}/package/${packageId}`, requestOptions)
        .then(response => response.json())
        .then(user => {
          setEditPackage(false);
          if (user.statusCode == 200) {
            handleClickVariant('success', user.response.message);
            getAllPackages();
            resetValue();
          } else {
            handleClickVariant('error', user.response.message);
          }
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          amount: JSON.parse(amount),
          amountSymbolId: selectedCurrency,
          description,
          title,
          campaignId: id,
        }),
      };
      setLoading(true);

      fetch(`${process.env.baseURL}/package`, requestOptions)
        .then(response => response.json())
        .then(user => {
          setEditPackage(false);
          setLoading(false);
          resetValue();

          if (user.statusCode == 200) {
            handleClickVariant('success', user.response.message);
          } else {
            handleClickVariant('error', user.response.message);
          }
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function edit() {
    setEditPackage(true);
    setShowEnterPackaje(true);
    setTitle(packageData.title);
    setDescription(packageData.description);
    setAmount(packageData.amount);
    setSelectedCurrency(packageData.amountSymbolId.id);
    handleClose();
    setPackageId(packageData.id);
    var elmnt = document.getElementById("myRef");
    elmnt.scrollIntoView();
  }

  function deletePackage() {
    handleClose();
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };
    setLoading(true);

    fetch(`${process.env.baseURL}/package/${packageData.id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        setLoading(false);
        if (user.statusCode == 200) {
          handleClickVariant('success', user.response.message);
          getAllPackages();
        } else {
          handleClickVariant('error', user.response.message);
        }
        console.log(user);
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
            {loading ? (
              <div
                className="col-12"
                style={{
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  height: '150px',
                }}
              >
                <Spinner animation="border" />
              </div>
            ) : (
                packages.map(data => (
                  <Col key={data.id} sm={6} style={{ marginBottom: '30px' }}>
                    <Card className="defined-payments">
                      <div className="card-heading-inner">
                        <CustomHeading>{data.title}</CustomHeading>
                        <CustomHeadingNum>
                          {data.amountSymbolId.symbol} {data.amount}
                        </CustomHeadingNum>
                      </div>
                      <span className="menuIcon" onClick={handleClick(data)}>
                        <svg
                          version="1.1"
                          id="Capa_1"
                          width="15px"
                          y="0px"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <g>
                              <g>
                                <circle cx="256" cy="256" r="64" />
                                <circle cx="256" cy="448" r="64" />
                                <circle cx="256" cy="64" r="64" />
                              </g>
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
                      </span>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <MenuItem onClick={edit}>Edit</MenuItem>
                        <MenuItem onClick={deletePackage}>Delete</MenuItem>
                      </Menu>
                      <div style={{ textAlign: 'initial' }}>
                        <p>{data.description}</p>
                      </div>
                    </Card>
                  </Col>
                ))
              )}
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
            <div className="campaign-description" id='myRef' >
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
              <div className="packageForm">
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
                value={description}
                onChange={event => setDescription(event.target.value)}
                className="description"
                type="text"
              />

              <div style={{ textAlign: '-webkit-right', marginTop: '10px' }}>
                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Button className="saveBtn" onClick={addPackaje}>
                    {loading == false && <div>Save</div>}
                    {loading && <Spinner animation="border" size="sm" />}{' '}
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div
            style={{ margin: '10px 0px 20px auto' }}
          >
            <div className="campaignBtnsForm3">
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
