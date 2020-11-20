/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/**
 *
 * MyCampaigns
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import {
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  ProgressBar,
  Badge,
  Form,
  Modal,
  Image,
} from 'react-bootstrap';
import '../../containers/HomePage/dashboard.scss';
import { Link, withRouter } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';
import {
  getCampaigns,
  deleteCampaigns,
  changeCampaignStatus,
  getAdminCampaigns,
  suspendCampaign,
} from '../../utils/crud/myCampaigns';
import { RemoveHTMLTags } from '../../utils/helper';
import LoadingComponent from '../LoadingComponent';
import EmptyComponent from '../EmptyComponent';
import SuspendIcon from '../svg-icons/suspendIcon';
import { shallowEqual, useSelector } from 'react-redux';

const profileImg = require('../../images/placeholder.png');

const MyCampaigns = ({ ...props }) => {
  const [campaign, setCampaign] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(6);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [campaignSort, setCampaignSort] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentCampaignData, setCurrentCampaignData] = React.useState();
  const [currentCampaignStatus, setCurrentCampaignStatus] = React.useState();
  // const [totalCount, setTotalCount] = React.useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );

  const handleClose = () => {
    setAnchorEl(null);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    handleCloseMenu();
  };

  const handleClickMenu = campaignId => event => {
    setAnchorEl(event.currentTarget);
    setCurrentCampaignData(campaignId.id);
    setCurrentCampaignStatus(campaignId.statusId.id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickVariant = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function openLiveView(data) {
    if (data.statusId.id === 8) {
      handleClickVariant('error', 'This campaign is closed.');
    } else {
      const url = `${process.env.campaignLiveURL}/campaigndetails?id=${data.id
        }`;
      window.open(url, '_blank');
    }
  }

  const handleChangePage = useCallback((event, value) => {
    setPageNumber(value);
  }, []);

  useEffect(() => {
    setLoading(true);
    getSortCampaigns(pageSize, pageNumber, campaignSort);
  }, [pageSize, pageNumber, campaignSort]);

  function getSortCampaigns(pages, pageNo, campaignSortBy) {
    if (user.role !== 5) {
      getCampaigns(pages, pageNo, campaignSortBy || '')
        .then(({ data }) => {
          setLoading(false);
          // setTotalCount(data.response.data.totalCount);
          setTotalPages(Math.ceil(data.response.data.totalCount / pageSize));
          setCampaign(data.response.data.res);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      getAdminCampaigns(pages, pageNo, campaignSortBy || '')
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          // setTotalCount(data.response.data.totalCount);
          setTotalPages(Math.ceil(data.response.data.totalCount / pageSize));
          setCampaign(data.response.data.res);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }

  function dropdownValueSet(dropdownValue) {
    setPageNumber(1);
    if (dropdownValue === 1) {
      setCampaignSort(null);
    } else {
      setCampaignSort(dropdownValue);
    }
  }

function liveCampaign(){
  changeCampaignStatus(currentCampaignData, 7)
  .then(({ status }) => {
    if (status === 200) {
      setPageNumber(1);
      getSortCampaigns(pageSize, pageNumber, campaignSort);
      handleClickVariant('success', 'Campaign successfully closed.');
    }
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

  function closeCampaign() {
    changeCampaignStatus(currentCampaignData, 8)
      .then(({ status }) => {
        if (status === 200) {
          setPageNumber(1);
          getSortCampaigns(pageSize, pageNumber, campaignSort);
          handleClickVariant('success', 'Campaign successfully closed.');
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  // function totalRaised(data) {
  //   // eslint-disable-next-line func-names
  //   const totalAmount = data.reduce(function (acc, val) {
  //     return acc + val.amount;
  //   }, 0);

  //   return `${data.length > 0 ? data[0].amountSymbolId.symbol : ''
  //     } ${totalAmount / 100}`;
  // }

  function suspendCampaignByAdmin() {
    suspendCampaign(currentCampaignData, 9)
      .then(({ status }) => {
        if (status === 200) {
          setPageNumber(1);
          getSortCampaigns(pageSize, pageNumber, campaignSort);
          handleClickVariant('success', 'Campaign successfully suspend.');
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }


  function activeCampaignByAdmin() {
    suspendCampaign(currentCampaignData, 7)
      .then(({ status }) => {
        if (status === 200) {
          setPageNumber(1);
          getSortCampaigns(pageSize, pageNumber, campaignSort);
          handleClickVariant('success', 'Campaign successfully live.');
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }
  function deleteCampaign() {
    setShow(false);

    deleteCampaigns(currentCampaignData)
      .then(({ data, status }) => {
        if (status === 200) {
          setPageNumber(1);
          getSortCampaigns(pageSize, pageNumber, campaignSort);
          handleClickVariant('success', data.response.message);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  const PerPage = event => {
    setPageSize(event.target.value);
  };

  function getDropdownVal() {
    let dropdownText;
    if (campaignSort === 1) {
      dropdownText = 'All';
    }
    if (campaignSort === 7) {
      dropdownText = 'Live';
    }
    if (campaignSort === 6) {
      dropdownText = 'Draft';
    }
    if (campaignSort === 8) {
      dropdownText = 'Closed';
    }

    if (campaignSort === 9) {
      dropdownText = 'Suspended';
    }

    if (campaignSort === 5) {
      dropdownText = 'Deleted';
    }
    return dropdownText;
  }

  function progressBarVal(val) {
    // eslint-disable-next-line func-names
    // const raised = val.totalRaised.reduce(function (acc, val) {
    //   return acc + val.amount;
    // }, 0);
    const pb = Math.floor((val.totalRaised / val.amount) * 100);
    return pb;
  }

  function setBadgeColor(id) {
    if (id === 7) {
      return '#34c31a';
    }
    if (id === 6) {
      return '#f1cc1c';
    }
    if (id === 8) {
      return '#e62424';
    }
    if (id === 5) {
      return '#e62424';
    }
    if (id === 9) {
      return '#808080';
    }
  }

  function goToCampaignUpdates(id) {
    props.history.push(`addCampaignUpdates/${id}`);
  }

  function goToEditCampaign(id) {
    handleCloseMenu();
    props.history.push(`editCampaign/${id}`);
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of MyProfile" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>My Campaigns</span>

            <div className="campaignHeader1 d-flex  flex-sm-row">
              <Dropdown className="dropDownMain">
                <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                  {campaignSort ? getDropdownVal() : 'Filter Campaign'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => dropdownValueSet(1)}
                    className="dropItem"
                  >
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dropdownValueSet(7)}
                    className="dropItem"
                  >
                    Live
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dropdownValueSet(6)}
                    className="dropItem"
                  >
                    Draft
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dropdownValueSet(8)}
                    className="dropItem"
                  >
                    Closed
                  </Dropdown.Item>

                  {user.role === 5 && (
                    <>
                      <Dropdown.Item
                        onClick={() => dropdownValueSet(9)}
                        className="dropItem"
                      >
                        Suspended
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => dropdownValueSet(5)}
                        className="dropItem"
                      >
                        Deleted
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {
                user.role !== 5 && <Link to="/createCampaign" className="dropDownMain">
                  <Button className="campaignBtn">New Campaign</Button>{' '}
                </Link>}
            </div>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <LoadingComponent />
          ) : campaign?.length === 0 ? (
            <EmptyComponent message={'No Campaign Found!'} />
          ) : (
                <>
                  <Row>
                    {campaign.map(data => (
                      <Col
                        key={data.id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={4}
                        className="d-flex flex-column"
                      >
                        <Card className="campaign-card flex-grow-1">
                          <Badge
                            className="badgeCampaign text-capitalize"
                            style={{
                              backgroundColor: setBadgeColor(data.statusId.id),
                            }}
                          >
                            {data.statusId?.name?.toLowerCase()}
                          </Badge>
                          <div
                            className="deleteIcon"
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClickMenu(data)}
                          >
                            <svg
                              width="18px"
                              height="18px"
                              version="1.1"
                              id="Layer_1"
                              viewBox="0 0 512 512"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path d="M256,192c-35.292,0-64,28.708-64,64s28.708,64,64,64s64-28.708,64-64S291.292,192,256,192z M256,298.667     c-23.521,0-42.667-19.135-42.667-42.667s19.146-42.667,42.667-42.667s42.667,19.135,42.667,42.667S279.521,298.667,256,298.667z" />
                                    <path d="M256,384c-35.292,0-64,28.708-64,64c0,35.292,28.708,64,64,64s64-28.708,64-64C320,412.708,291.292,384,256,384z      M256,490.667c-23.521,0-42.667-19.135-42.667-42.667s19.146-42.667,42.667-42.667s42.667,19.135,42.667,42.667     S279.521,490.667,256,490.667z" />
                                    <path d="M256,128c35.292,0,64-28.708,64-64S291.292,0,256,0s-64,28.708-64,64S220.708,128,256,128z M256,21.333     c23.521,0,42.667,19.135,42.667,42.667S279.521,106.667,256,106.667S213.333,87.531,213.333,64S232.479,21.333,256,21.333z" />
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
                          </div>
                          <Menu
                            id="long-menu"
                            classes={{ paper: 'menuSetting' }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            {/* <Link className='editLink' to={`/editCampaign/${currentCampaignData}`}> */}
                            {user.role !== 5 && (
                              <>
                                {' '}
                                <MenuItem
                                  onClick={() =>
                                    goToEditCampaign(currentCampaignData)
                                  }
                                >
                                  <div>
                                    <svg
                                      className="editIcon"
                                      version="1.1"
                                      id="Capa_1"
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 512 512"
                                    >
                                      <g>
                                        <g>
                                          <path d="M481.996,30.006C462.647,10.656,436.922,0,409.559,0c-27.363,0-53.089,10.656-72.438,30.005L50.826,316.301    c-2.436,2.436-4.201,5.46-5.125,8.779L0.733,486.637c-1.939,6.968,0.034,14.441,5.163,19.542c3.8,3.78,8.892,5.821,14.106,5.821    c1.822,0,3.66-0.25,5.463-0.762l161.557-45.891c6.816-1.936,12.1-7.335,13.888-14.192c1.788-6.857-0.186-14.148-5.189-19.167    L93.869,329.827L331.184,92.511l88.258,88.258L237.768,361.948c-7.821,7.8-7.838,20.463-0.038,28.284    c7.799,7.822,20.464,7.838,28.284,0.039l215.98-215.392C501.344,155.53,512,129.805,512,102.442    C512,75.079,501.344,49.354,481.996,30.006z M143.395,436.158L48.827,463.02l26.485-95.152L143.395,436.158z M453.73,146.575    l-5.965,5.949l-88.296-88.297l5.938-5.938C377.2,46.495,392.88,40,409.559,40c16.679,0,32.358,6.495,44.152,18.29    C465.505,70.083,472,85.763,472,102.442C472,119.121,465.505,134.801,453.73,146.575z" />
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
                                  </div>
                                  <span style={{ marginLeft: '10px' }}>
                                    Edit Campaign
                              </span>
                                </MenuItem>
                                {currentCampaignStatus === 8 && (
                                  <MenuItem
                                    className="menuList"
                                    onClick={() => {
                                      setAnchorEl(null);
                                      liveCampaign();
                                    }}
                                  >
                                    <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18px"
                                        viewBox="0 -56 512 512"
                                        width="18px"
                                      >
                                        <path d="m432 400h-352c-44.113281 0-80-35.886719-80-80v-240c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v140c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-140c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v240c0 22.054688 17.945312 40 40 40h352c22.054688 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80zm-219.824219-168c-8.339843 0-15.625 5.332031-18.484375 13.160156-5.207031 14.257813-18.660156 24.449219-34.777344 24.828125-21.367187.507813-38.914062-16.730469-38.914062-37.988281v-63.285156c0-20.753906 16.339844-38.210938 37.085938-38.703125 16.765624-.398438 31.175781 10.125 36.609374 24.945312 2.847657 7.777344 10.121094 13.042969 18.40625 13.042969h1.03125c13.421876 0 22.914063-13.261719 18.441407-25.917969-10.789063-30.535156-40.082031-52.410156-74.34375-52.078125-42.484375.410156-77.230469 36.503906-77.230469 78.992188v62.011718c0 42.941407 34.289062 78.574219 77.230469 78.988282 34.238281.332031 63.515625-21.511719 74.320312-52.011719 4.492188-12.683594-5.03125-25.984375-18.488281-25.984375zm196 0c-8.339843 0-15.625 5.332031-18.484375 13.160156-5.207031 14.257813-18.660156 24.449219-34.777344 24.828125-21.367187.507813-38.914062-16.730469-38.914062-37.988281v-63.285156c0-20.753906 16.339844-38.210938 37.085938-38.703125 16.765624-.398438 31.175781 10.125 36.609374 24.945312 2.847657 7.777344 10.121094 13.042969 18.40625 13.042969h1.03125c13.421876 0 22.914063-13.261719 18.441407-25.917969-10.789063-30.535156-40.082031-52.410156-74.34375-52.078125-42.484375.410156-77.230469 36.503906-77.230469 78.992188v62.011718c0 42.941407 34.289062 78.574219 77.230469 78.988282 34.238281.332031 63.515625-21.511719 74.320312-52.011719 4.492188-12.683594-5.03125-25.984375-18.488281-25.984375zm0 0" />
                                      </svg>
                                    </div>
                                    <span style={{ marginLeft: '10px' }}>
                                      Live Campaign
                                </span>
                                  </MenuItem>
                                )}
                                {currentCampaignStatus === 7 && (
                                  <MenuItem
                                    className="menuList"
                                    onClick={() => {
                                      setAnchorEl(null);
                                      closeCampaign();
                                    }}
                                  >
                                    <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18px"
                                        viewBox="0 -56 512 512"
                                        width="18px"
                                      >
                                        <path d="m432 400h-352c-44.113281 0-80-35.886719-80-80v-240c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v140c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-140c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v240c0 22.054688 17.945312 40 40 40h352c22.054688 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80zm-219.824219-168c-8.339843 0-15.625 5.332031-18.484375 13.160156-5.207031 14.257813-18.660156 24.449219-34.777344 24.828125-21.367187.507813-38.914062-16.730469-38.914062-37.988281v-63.285156c0-20.753906 16.339844-38.210938 37.085938-38.703125 16.765624-.398438 31.175781 10.125 36.609374 24.945312 2.847657 7.777344 10.121094 13.042969 18.40625 13.042969h1.03125c13.421876 0 22.914063-13.261719 18.441407-25.917969-10.789063-30.535156-40.082031-52.410156-74.34375-52.078125-42.484375.410156-77.230469 36.503906-77.230469 78.992188v62.011718c0 42.941407 34.289062 78.574219 77.230469 78.988282 34.238281.332031 63.515625-21.511719 74.320312-52.011719 4.492188-12.683594-5.03125-25.984375-18.488281-25.984375zm196 0c-8.339843 0-15.625 5.332031-18.484375 13.160156-5.207031 14.257813-18.660156 24.449219-34.777344 24.828125-21.367187.507813-38.914062-16.730469-38.914062-37.988281v-63.285156c0-20.753906 16.339844-38.210938 37.085938-38.703125 16.765624-.398438 31.175781 10.125 36.609374 24.945312 2.847657 7.777344 10.121094 13.042969 18.40625 13.042969h1.03125c13.421876 0 22.914063-13.261719 18.441407-25.917969-10.789063-30.535156-40.082031-52.410156-74.34375-52.078125-42.484375.410156-77.230469 36.503906-77.230469 78.992188v62.011718c0 42.941407 34.289062 78.574219 77.230469 78.988282 34.238281.332031 63.515625-21.511719 74.320312-52.011719 4.492188-12.683594-5.03125-25.984375-18.488281-25.984375zm0 0" />
                                      </svg>
                                    </div>
                                    <span style={{ marginLeft: '10px' }}>
                                      Close Campaign
                                </span>
                                  </MenuItem>
                                )}
                                <MenuItem className="menuList" onClick={handleShow}>
                                  <svg
                                    height="18px"
                                    viewBox="-40 0 427 427.00131"
                                    width="18px"
                                  >
                                    <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                    <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                    <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                  </svg>
                                  <span style={{ marginLeft: '10px' }}>
                                    Delete Campaign
                              </span>
                                </MenuItem>
                              </>
                            )}
                            {/* {user.role === 5 && (currentCampaignStatus !== 9 ?
                              <MenuItem
                                className="menuList"
                                onClick={() => {
                                  setAnchorEl(null);
                                  suspendCampaignByAdmin();
                                }}
                              >
                                <SuspendIcon size="18px" />
                                <span style={{ marginLeft: '10px' }}>
                                  {currentCampaignStatus}
                                </span>
                              </MenuItem> : '')


                            } */}
                            {user.role === 5 && (currentCampaignStatus === 9 ?
                              <MenuItem
                                className="menuList"
                                onClick={() => {
                                  setAnchorEl(null);
                                  activeCampaignByAdmin();
                                }}
                              >
                                <SuspendIcon size="18px" />
                                <span style={{ marginLeft: '10px' }}>
                                  Live Campaign
                                </span>
                              </MenuItem> :
                              <MenuItem
                                className="menuList"
                                onClick={() => {
                                  setAnchorEl(null);
                                  suspendCampaignByAdmin();
                                }}
                              >
                                <SuspendIcon size="18px" />
                                <span style={{ marginLeft: '10px' }}>
                                  Suspend Campaign
                                </span>
                              </MenuItem>)
                            }
                          </Menu>
                          <div className="give-card__media">
                            {data.titleImage ? (
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                src={data.titleImage}
                                alt=""
                              />
                            ) : (
                                <Image
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                  src={profileImg}
                                  alt=""
                                />
                              )}
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title className="d-flex align-items-center author_details">
                              <div className="author-photo-myCampaign">
                                {data.creatorImage ? <img
                                  alt=""
                                  src={data.creatorImage}
                                  className="avatar avatar-96 photo"
                                  height="96"
                                  width="96"
                                /> : <img
                                    alt=""
                                    src="https://0.gravatar.com/avatar/6a7831cd395934213cf4dc10a70a7e80?s=96&amp;d=mm&amp;r=g"
                                    className="avatar avatar-96 photo"
                                    height="96"
                                    width="96"
                                  />}
                              </div>
                              <span className="author-name">
                                {data.creatorFirstName}
                              </span>
                            </Card.Title>
                            <h3
                              className="give-card__title"
                              style={{ cursor: 'pointer' }}
                              onClick={() => goToCampaignUpdates(data.id)}
                            >
                              {data.title}
                            </h3>
                            <div className="skillbar">
                              <ProgressBar animated now={progressBarVal(data)} />
                              <div className="count">
                                <span>
                                  {progressBarVal(data) > 100
                                    ? '100'
                                    : progressBarVal(data)}
                              %
                            </span>
                              </div>
                            </div>
                            <Card.Text
                              className="descriptionCampaign flex-grow-1"
                            // dangerouslySetInnerHTML={{
                            //   __html: data.description,
                            // }}
                            >
                              {data.description ? RemoveHTMLTags(data.description) : 'No Description...'}

                            </Card.Text>
                            <ul className="campign-info">
                              <li className="raised">
                                <span className="title">Target</span>
                                <span className="content">
                                  {data.amountSymbolId.symbol} {data.amount / 100}
                                </span>
                              </li>
                              <li className="pledged">
                                <span className="title">Raised</span>
                                <span className="content">
                                  {data.totalRaised/100}
                                </span>
                              </li>
                              <li className="donators">
                                <span className="title">Donators</span>
                                <span className="content">
                                  {data.totalDonors}
                                </span>
                              </li>
                            </ul>
                            <div className="campaignBtns">
                              <Link to={`/campaignView/${data.id}`}>
                                <Button className="viewCampaignBtn">
                                  View Campaign
                            </Button>{' '}
                              </Link>
                              <Button
                                className="editCampaignBtn"
                                onClick={() => openLiveView(data)}
                              >
                                Live View
                          </Button>{' '}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <div className="paginatordiv">
                    <div className="paginatorPerSize">
                      <span>Per Page</span>
                      <Form.Control
                        as="select"
                        className="paginatorPerPage"
                        onChange={PerPage}
                      >
                        <option className="paginatorPerPageOption" value="6">
                          6
                    </option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                      </Form.Control>
                    </div>
                    <Pagination
                      count={totalPages}
                      classes={{ ul: 'paginationColor' }}
                      onChange={handleChangePage}
                      variant="outlined"
                      shape="rounded"
                      page={pageNumber}
                    />
                  </div>
                </>
              )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your campaign? If you delete you will
          permanently lose your campaign.
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtnNo" onClick={handleClose}>
            No
          </Button>
          <Button className="modalBtnYes" onClick={deleteCampaign}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

MyCampaigns.propTypes = {};

export default withRouter(memo(MyCampaigns));
