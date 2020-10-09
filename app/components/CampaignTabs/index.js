/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/**
 *
 * CampaignTabs
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { ListGroup, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Header from '../Header/Loadable';
import '../../containers/HomePage/dashboard.scss';
import Footer from '../Footer/Loadable';

import './campaignTabs.scss';

// eslint-disable-next-line react/prop-types
function CampaignTabs({ children, ...props }) {
  const token = localStorage.getItem('token');
  const [campaignData, setCampaignData] = React.useState();
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(
      `${process.env.baseURL}/campaignBasicDetails/${props.match.params.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(user => {
        setCampaignData(user.response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function backFunction() {
    // eslint-disable-next-line react/prop-types
    props.history.goBack();
  }

  return (
    <div>
      <Header title="Dasboard" />
      <div
        className="container"
        style={{ minHeight: '700px', marginTop: '-5rem' }}
      >
        <div className="backButtonMain">
          <div
            onClick={() => {
              backFunction();
            }}
            aria-hidden
            tabIndex="-1"
            role="button"
          >
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 268.833 268.833"
            >
              <g>
                <path d="M256.333,121.916H42.679l58.659-58.661c4.882-4.882,4.882-12.796,0-17.678c-4.883-4.881-12.797-4.881-17.678,0l-79.998,80   c-4.883,4.882-4.883,12.796,0,17.678l80,80c2.439,2.439,5.64,3.661,8.839,3.661s6.397-1.222,8.839-3.661   c4.882-4.882,4.882-12.796,0-17.678l-58.661-58.661h213.654c6.903,0,12.5-5.598,12.5-12.5   C268.833,127.513,263.236,121.916,256.333,121.916z" />
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
            <span>Back</span>
          </div>
        </div>
        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          <Col sm={12} md={3}>
            <Card className="shadow mb-5 bg-white sideNav dataCard">
              <ListGroup variant="flush">
                <ListGroup.Item className="listItem">
                  <NavLink
                    to={`/addCampaignUpdates/${props.match.params.id}`}
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                      >
                        <g>
                          <g>
                            <path d="M358.4,55.467c-18.825,0-34.133,15.309-34.133,34.133v6.17l-199.441,79.77c-3.234,1.306-5.359,4.437-5.359,7.927v119.467c0,3.49,2.125,6.622,5.359,7.919l199.441,79.77v6.178c0,18.825,15.309,34.133,34.133,34.133s34.133-15.309,34.133-34.133V89.6C392.533,70.775,377.225,55.467,358.4,55.467z M375.467,396.8c0,9.412-7.654,17.067-17.067,17.067s-17.067-7.654-17.067-17.067v-11.947c0-3.499-2.125-6.63-5.367-7.927l-199.433-79.77V189.244l199.433-79.77c3.243-1.306,5.367-4.437,5.367-7.927V89.6c0-9.412,7.654-17.067,17.067-17.067s17.067,7.654,17.067,17.067V396.8z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M128,174.933H68.267C30.626,174.933,0,205.559,0,243.2s30.626,68.267,68.267,68.267H128c4.71,0,8.533-3.814,8.533-8.533V183.467C136.533,178.756,132.71,174.933,128,174.933z M119.467,294.4h-51.2c-28.237,0-51.2-22.963-51.2-51.2S40.03,192,68.267,192h51.2V294.4z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M437.897,209.502l-51.2-17.067c-2.611-0.862-5.453-0.427-7.689,1.178c-2.227,1.604-3.541,4.181-3.541,6.921v85.333c0,2.739,1.314,5.316,3.541,6.929c1.476,1.058,3.226,1.604,4.992,1.604c0.905,0,1.818-0.145,2.697-0.444l51.2-17.067c3.49-1.152,5.837-4.412,5.837-8.09v-51.2C443.733,213.922,441.387,210.671,437.897,209.502z M426.667,262.647l-34.133,11.375v-61.653l34.133,11.375V262.647z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M169.873,409.54l-8.567-8.576l-25.028-100.096c-0.947-3.797-4.361-6.468-8.277-6.468H59.733c-2.611,0-5.069,1.195-6.69,3.226c-1.621,2.048-2.219,4.719-1.621,7.262l34.133,145.067c0.93,3.917,4.42,6.579,8.303,6.579c0.538,0,1.075-0.051,1.621-0.162l64.085-12.373c0.085-0.017,0.171-0.034,0.256-0.051c3.755-0.845,7.185-2.722,9.916-5.41c3.891-3.849,6.05-8.969,6.084-14.447C175.855,418.62,173.756,413.466,169.873,409.54z M157.747,426.385c-0.435,0.435-0.981,0.734-1.579,0.887l-55.868,10.795l-29.79-126.601h50.825l23.996,95.932c0.375,1.502,1.152,2.876,2.244,3.968l10.206,10.206c0.862,0.862,0.981,1.877,0.981,2.415C158.754,424.508,158.618,425.523,157.747,426.385z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="460.8"
                              y="234.667"
                              width="51.2"
                              height="17.067"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="457.249"
                              y="145.084"
                              transform="matrix(0.8574 -0.5146 0.5146 0.8574 -10.3129 270.0117)"
                              width="49.757"
                              height="17.066"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="473.655"
                              y="307.917"
                              transform="matrix(0.5145 -0.8575 0.8575 0.5145 -51.2652 575.049)"
                              width="17.067"
                              height="49.758"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="324.267"
                              y="98.133"
                              width="17.067"
                              height="290.133"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="85.333"
                              y="209.067"
                              width="17.067"
                              height="34.133"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="51.2"
                              y="209.067"
                              width="17.067"
                              height="34.133"
                            />
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
                    <span>Updates</span>
                  </NavLink>
                </ListGroup.Item>

                <ListGroup.Item className="listItem">
                  <NavLink
                    to={`/donations/${props.match.params.id}`}
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <svg
                        height="20"
                        className="iconImage"
                        viewBox="0 -68 512 512"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m502 180.933594h-59.226562c-5.523438 0-10 4.476562-10 10v8.449218h-62.277344c-1.3125 0-2.613282.257813-3.824219.761719l-79.773437 33.015625c-9.230469 3.824219-16.402344 11.019532-20.1875 20.265625-3.789063 9.242188-3.730469 19.398438.164062 28.601563l.269531.636718c2.3125 5.460938 5.71875 10.105469 9.855469 13.777344-12.140625 3.292969-24.871094 3.558594-37.246094.726563l-78.316406-17.933594c-9.582031-2.191406-19.417969-.476563-27.691406 4.832031-8.269532 5.304688-13.929688 13.53125-15.929688 23.152344-3.964844 19.0625 7.714844 37.753906 26.585938 42.550781l93.445312 23.75c7.914063 2.007813 15.9375 3.007813 23.933594 3.007813 11.988281 0 23.917969-2.246094 35.304688-6.714844l118.84375-46.609375h16.84375v5.261719c0 5.523437 4.480468 10 10 10h59.226562c5.523438 0 10-4.476563 10-10v-137.53125c0-5.523438-4.476562-10-10-10zm-87.964844 122.269531c-1.25 0-2.488281.234375-3.648437.6875l-120.605469 47.304687c-15.066406 5.90625-31.320312 6.921876-47.007812 2.9375l-93.445313-23.75c-8.46875-2.152343-13.710937-10.539062-11.933594-19.09375.898438-4.320312 3.4375-8.011718 7.152344-10.390624 2.65625-1.707032 5.675781-2.585938 8.753906-2.585938 1.21875 0 2.449219.136719 3.671875.417969l78.316406 17.929687c18.84375 4.3125 38.339844 2.929688 56.386719-4.007812l22.726563-8.738282c.46875-.160156.933594-.332031 1.398437-.511718 20.089844-7.746094 45.730469-17.605469 51.242188-19.726563l1.074219-.414062c5.152343-1.980469 7.726562-7.769531 5.746093-12.921875-1.980469-5.15625-7.765625-7.726563-12.925781-5.746094 0 0-.410156.160156-1.167969.449219l-52.121093 20.042969c-8.835938 2.863281-18.390626-1.488282-22.085938-10.21875l-.273438-.640626c-1.800781-4.25-1.824218-8.945312-.074218-13.21875 1.75-4.273437 5.0625-7.601562 9.332031-9.367187l77.9375-32.257813h60.289063v83.820313zm77.964844 15.261719h-39.226562v-117.53125h39.226562zm0 0" />
                        <path d="m97.382812 176.753906h-18.152343v-93.4375h2.769531c7.394531 0 14.777344-1.78125 21.351562-5.152344.308594-.160156.613282-.332031.902344-.523437l64.761719-42.253906c8.949219-4.390625 19.824219-3.390625 27.832031 2.59375l4.675782 3.484375c-.285157.402344-.558594.8125-.835938 1.214844-1.234375 1.796874-2.421875 3.628906-3.539062 5.5-6.914063 11.550781-11.355469 24.546874-12.988282 37.800781-6.816406.734375-13.128906 3.742187-18.042968 8.652343-5.691407 5.691407-8.828126 13.269532-8.828126 21.332032 0 16.628906 13.53125 30.160156 30.160157 30.160156h74.03125c4.085937 0 7.933593 1.59375 10.820312 4.472656 2.898438 2.90625 4.496094 6.757813 4.5 10.84375-.003906 6.101563-3.578125 11.601563-9.144531 14.027344-.644531.285156-1.226562.496094-1.773438.648438-.050781.015624-.097656.03125-.148437.046874-1.347656.390626-2.777344.589844-4.253906.589844h-84.117188c-5.519531 0-10 4.476563-10 10 0 5.523438 4.480469 10 10 10h84.117188c2.582031 0 5.128906-.28125 7.605469-.824218 4.199218.539062 8.453124.832031 12.683593.832031 54.246094 0 98.382813-44.132813 98.382813-98.382813 0-54.246094-44.136719-98.378906-98.382813-98.378906-24.996093 0-48.921875 9.519531-67.027343 26.378906l-5.929688-4.425781c-14.207031-10.613281-33.585938-12.242187-49.359375-4.144531-.308594.15625-.605469.332031-.898437.519531l-64.753907 42.25c-3.65625 1.792969-7.726562 2.734375-11.800781 2.734375h-2.773438v-3.617188c0-5.523437-4.476562-10-10-10h-59.226562c-5.523438 0-10 4.476563-10 10v137.53125c0 5.523438 4.476562 10 10 10h59.226562c5.523438 0 10-4.476562 10-10v-.472656h18.15625c5.519532 0 10-4.476562 10-10 0-5.523437-4.480468-10-10-10zm79.90625-60.789062c0-2.71875 1.054688-5.273438 2.972657-7.1875 1-1 2.175781-1.761719 3.457031-2.265625.542969 6.6875 1.761719 13.234375 3.636719 19.609375-5.558594-.050782-10.066407-4.585938-10.066407-10.15625zm182.859376-17.582032c0 39.144532-28.847657 71.683594-66.40625 77.464844 2.007812-4.507812 3.058593-9.46875 3.058593-14.40625 0-6.058594-1.527343-11.882812-4.386719-17.054687 4.339844-.683594 8.347657-2.6875 11.515626-5.855469 3.960937-3.957031 6.140624-9.21875 6.140624-14.816406v-14.789063c0-11.554687-9.402343-20.957031-20.957031-20.957031h-14.671875c-.527344 0-.957031-.429688-.957031-.957031v-13.960938c0-.527343.429687-.953125.957031-.953125h7.332032.003906.003906 7.332031c.527344 0 .957031.425782.957031.953125 0 5.523438 4.476563 10 10 10 5.519532 0 10-4.476562 10-10 0-10.648437-7.996093-19.449219-18.292968-20.765625v-3.464844c0-5.523437-4.476563-10-10-10-5.523438 0-10 4.476563-10 10v3.464844c-10.300782 1.316406-18.292969 10.117188-18.292969 20.765625v13.960938c0 11.554687 9.402344 20.957031 20.957031 20.957031h14.671875c.527344 0 .957031.429688.957031.957031v14.789063c0 .261718-.09375.488281-.28125.675781-.1875.183594-.410156.277344-.675781.277344h-14.671875c-.527344 0-.957031-.429688-.957031-.953125v-1.355469c0-5.523437-4.476563-10-10-10s-10 4.476563-10 10v1.355469c0 .8125.058594 1.613281.148437 2.40625h-45.195312c-3.351562-8.820313-5.046875-18.128906-5.046875-27.738282 0-14.652343 4.167969-29.320312 12.019531-41.707031 2.257813-3.558593 4.773438-6.953125 7.566406-10.113281 14.878907-16.882812 36.292969-26.5625 58.792969-26.5625 43.21875 0 78.378907 35.160156 78.378907 78.382812zm-300.921876 88.847657h-39.226562v-117.535157h39.226562zm0 0" />
                        <path d="m145.390625 181.210938c-2.347656-3.589844-6.949219-5.242188-11.054687-4.066407-3.96875 1.140625-6.863282 4.691407-7.21875 8.800781-.359376 4.152344 2.050781 8.207032 5.839843 9.914063 3.753907 1.695313 8.273438.882813 11.195313-2.027344 3.332031-3.328125 3.847656-8.710937 1.238281-12.621093zm0 0" />
                      </svg>
                    </div>
                    <span>Donations</span>
                  </NavLink>
                </ListGroup.Item>

                {/* 
                <ListGroup.Item className="listItem">
                  <NavLink
                    to="/team"
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                      >
                        <g>
                          <g>
                            <path d="M451.72,237.26c-17.422-8.71-50.087-8.811-51.469-8.811c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5c8.429,0.001,32.902,1.299,44.761,7.228c1.077,0.539,2.221,0.793,3.348,0.793c2.751,0,5.4-1.52,6.714-4.147C456.927,243.618,455.425,239.113,451.72,237.26z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M489.112,344.041l-30.975-8.85c-1.337-0.382-2.271-1.62-2.271-3.011v-10.339c2.52-1.746,4.924-3.7,7.171-5.881c10.89-10.568,16.887-24.743,16.887-39.915v-14.267l2.995-5.989c3.287-6.575,5.024-13.936,5.024-21.286v-38.65c0-4.142-3.358-7.5-7.5-7.5H408.27c-26.244,0-47.596,21.352-47.596,47.596v0.447c0,6.112,1.445,12.233,4.178,17.699l3.841,7.682v12.25c0,19.414,9.567,36.833,24.058,47.315l0.002,10.836c0,1.671,0,2.363-6.193,4.133l-15.114,4.318l-43.721-15.898c0.157-2.063-0.539-4.161-2.044-5.742l-13.971-14.678v-24.64c1.477-1.217,2.933-2.467,4.344-3.789c17.625-16.52,27.733-39.844,27.733-63.991v-19.678c5.322-11.581,8.019-23.836,8.019-36.457v-80.19c0-4.142-3.358-7.5-7.5-7.5H232.037c-39.51,0-71.653,32.144-71.653,71.653v16.039c0,12.621,2.697,24.876,8.019,36.457v16.931c0,28.036,12.466,53.294,32.077,69.946v25.22l-13.971,14.678c-1.505,1.581-2.201,3.679-2.044,5.742l-46.145,16.779c-3.344,1.216-6.451,2.863-9.272,4.858l-7.246-3.623c21.57-9.389,28.403-22.594,28.731-23.25c1.056-2.111,1.056-4.597,0-6.708c-5.407-10.814-6.062-30.635-6.588-46.561c-0.175-5.302-0.341-10.311-0.658-14.771c-2.557-35.974-29.905-63.103-63.615-63.103s-61.059,27.128-63.615,63.103c-0.317,4.461-0.483,9.47-0.658,14.773c-0.526,15.925-1.182,35.744-6.588,46.558c-1.056,2.111-1.056,4.597,0,6.708c0.328,0.656,7.147,13.834,28.76,23.234l-20.127,10.063C6.684,358.176,0,368.991,0,381.02v55.409c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V381.02c0-6.312,3.507-11.987,9.152-14.81l25.063-12.531l8.718,8.285c6.096,5.793,13.916,8.688,21.739,8.688c7.821,0,15.645-2.897,21.739-8.688l8.717-8.284l8.172,4.086c-3.848,6.157-6.032,13.377-6.032,20.94v57.725c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-57.725c0-10.296,6.501-19.578,16.178-23.097l48.652-17.691l20.253,30.381c2.589,3.884,6.738,6.375,11.383,6.835c0.518,0.051,1.033,0.076,1.547,0.076c4.098,0,8.023-1.613,10.957-4.546l12.356-12.356v78.124c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-78.124l12.356,12.356c2.933,2.934,6.858,4.547,10.957,4.547c0.513,0,1.029-0.025,1.546-0.076c4.646-0.46,8.795-2.951,11.384-6.835l20.254-30.38l48.651,17.691c9.676,3.519,16.178,12.801,16.178,23.097v57.725c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-57.725c0-10.428-4.143-20.208-11.093-27.441l1.853-0.529c1.869-0.534,4.419-1.265,6.979-2.52l19.149,19.149v69.066c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-69.066l19.016-19.016c1.011,0.514,2.073,0.948,3.191,1.267l30.976,8.85c7.07,2.02,12.009,8.567,12.009,15.921v62.044c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-62.044C512,360.371,502.588,347.892,489.112,344.041z M48.115,330.794c-14.029-5.048-21.066-11.778-24.07-15.453c2.048-5.354,3.376-11.486,4.275-17.959c4.136,9.917,11.063,18.383,19.795,24.423V330.794z M91.08,351.092c-6.397,6.078-16.418,6.077-22.813-0.001l-6.975-6.628c1.177-2.205,1.824-4.705,1.824-7.324v-7.994c5.232,1.635,10.794,2.517,16.558,2.517c5.757,0,11.316-0.886,16.557-2.512l-0.001,7.988c0,2.62,0.646,5.121,1.824,7.327L91.08,351.092z M79.676,316.662c-22.396,0-40.615-18.22-40.615-40.615c0-4.142-3.358-7.5-7.5-7.5c-0.42,0-0.83,0.043-1.231,0.11c0.022-0.645,0.043-1.291,0.065-1.93c0.167-5.157,0.328-10.028,0.625-14.206c0.958-13.476,6.343-25.894,15.163-34.968c8.899-9.156,20.793-14.198,33.491-14.198s24.591,5.042,33.491,14.198c8.82,9.074,14.205,21.492,15.163,34.968c0.296,4.177,0.458,9.047,0.628,14.203c0.015,0.443,0.03,0.892,0.045,1.338c-8.16-12.572-20.762-21.837-37.045-27.069c-15.043-4.833-27.981-4.534-28.527-4.52c-1.964,0.055-3.828,0.877-5.191,2.291l-13.532,14.034c-2.875,2.982-2.789,7.73,0.193,10.605s7.73,2.788,10.605-0.193l11.26-11.677c9.697,0.474,40.894,4.102,53.027,30.819C116.738,302.04,99.816,316.662,79.676,316.662z M111.229,330.819l0.001-8.945c8.725-6.007,15.662-14.457,19.801-24.449c0.899,6.458,2.226,12.576,4.27,17.918C132.314,318.983,125.244,325.773,111.229,330.819z M183.403,209.145v-18.608c0-1.129-0.255-2.244-0.746-3.261c-4.826-9.994-7.273-20.598-7.273-31.518V139.72c0-31.239,25.415-56.653,56.653-56.653h104.769v72.692c0,10.92-2.447,21.524-7.273,31.518c-0.491,1.017-0.746,2.132-0.746,3.261v21.355c0,20.311-8.165,39.15-22.991,53.047c-1.851,1.734-3.772,3.36-5.758,4.875c-0.044,0.03-0.086,0.063-0.129,0.094c-13.889,10.545-30.901,15.67-48.667,14.519C213.201,281.965,183.403,248.897,183.403,209.145z M225.632,360.056c-0.052,0.052-0.173,0.175-0.418,0.149c-0.244-0.024-0.34-0.167-0.381-0.229l-23.325-34.988l7.506-7.887l35.385,24.187L225.632,360.056z M256.095,331.113l-40.615-27.762v-14c10.509,5.681,22.276,9.234,34.791,10.044c1.977,0.128,3.942,0.191,5.901,0.191c14.341,0,28.143-3.428,40.538-9.935v13.7L256.095,331.113z M287.357,359.978c-0.041,0.062-0.137,0.205-0.381,0.229c-0.245,0.031-0.365-0.098-0.418-0.149l-18.767-18.767l35.385-24.188l7.507,7.887L287.357,359.978z M424.308,353.65l-17.02-17.019c0.297-1.349,0.465-2.826,0.464-4.455l-0.001-3.165c4.723,1.55,9.701,2.47,14.852,2.624c0.578,0.018,1.151,0.026,1.727,0.026c5.692,0,11.248-0.86,16.536-2.501v3.02c0,1.496,0.188,2.962,0.542,4.371L424.308,353.65z M452.591,305.196c-7.949,7.714-18.45,11.788-29.537,11.446c-21.704-0.651-39.361-19.768-39.361-42.613v-14.021c0-1.165-0.271-2.313-0.792-3.354l-4.633-9.266c-1.697-3.395-2.594-7.195-2.594-10.991v-0.447c0-17.974,14.623-32.596,32.596-32.596h64.673v31.15c0,5.034-1.19,10.075-3.441,14.578l-3.786,7.572c-0.521,1.042-0.792,2.189-0.792,3.354v16.038C464.924,287.126,460.544,297.478,452.591,305.196z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M472.423,380.814c-4.142,0-7.5,3.358-7.5,7.5v48.115c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-48.115C479.923,384.173,476.565,380.814,472.423,380.814z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M39.577,390.728c-4.142,0-7.5,3.358-7.5,7.5v38.201c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-38.201C47.077,394.087,43.719,390.728,39.577,390.728z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M317.532,158.475c-28.366-28.366-87.715-22.943-111.917-19.295c-7.623,1.149-13.155,7.6-13.155,15.339v17.278c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-17.279c0-0.255,0.168-0.473,0.392-0.507c9.667-1.457,28.85-3.705,48.725-2.38c23.388,1.557,40.328,7.428,50.349,17.45c2.929,2.929,7.678,2.929,10.606,0C320.461,166.152,320.461,161.403,317.532,158.475z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M167.884,396.853c-4.142,0-7.5,3.358-7.5,7.5v32.077c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-32.077C175.384,400.212,172.026,396.853,167.884,396.853z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M344.306,396.853c-4.142,0-7.5,3.358-7.5,7.5v32.077c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-32.077C351.806,400.212,348.448,396.853,344.306,396.853z" />
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

                    <span>Teams</span>
                  </NavLink>
                </ListGroup.Item> */}
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card className="dataCard shadow mb-5 bg-white">
              <Card.Header
                style={{ background: 'transparent', borderBottom: 'none' }}
              >
                <Card.Title className="campaignUpdates">
                  <div style={{ width: '30%' }}>
                    <span style={{ marginTop: '8px' }}>
                      {campaignData ? campaignData.campaignTitle : ''}
                    </span>
                    <ul className="campign-Status">
                      <li className="raised">
                        <span className="content">
                          {campaignData
                            ? campaignData.campaignAmountSymbol.symbol
                            : ''}{' '}
                          {campaignData ? campaignData.campaignTarget : ''}
                        </span>
                        <span className="title">Target</span>
                      </li>
                      <li className="pledged">
                        <span className="content">
                          {campaignData
                            ? campaignData.campaignAmountSymbol.symbol
                            : ''}{' '}
                          {campaignData ? campaignData.totalDonations : ''}
                        </span>
                        <span className="title">Raised</span>
                      </li>
                      <li className="donators">
                        <span className="content">
                          {campaignData ? campaignData.totalDonors : ''}
                        </span>
                        <span className="title">Donators</span>
                      </li>
                    </ul>
                  </div>

                  <div className="campaignUpdatesHeader d-flex flex-column flex-sm-row">
                    <Link to={`/campaignView/${props.match.params.id}`}>
                      <Button className="campaignViewBtn">View Campaign</Button>{' '}
                    </Link>

                    <Link to={`/editCampaign/${props.match.params.id}`}>
                      <Button className="editCampaign">Edit Campaign</Button>{' '}
                    </Link>
                  </div>
                </Card.Title>
              </Card.Header>

              <Card.Body>{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

CampaignTabs.propTypes = {};

export default withRouter(memo(CampaignTabs));
