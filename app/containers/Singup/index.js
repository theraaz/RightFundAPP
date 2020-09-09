/**
 *
 * Singup
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSingup from './selectors';
import reducer from './reducer';
import Layout from '../../components/AuthLayout'

import { Button, Form, Col } from 'react-bootstrap';
import './signup.scss';
import { Helmet } from 'react-helmet';
export function Singup() {
  useInjectReducer({ key: 'singup', reducer });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [asCharity, setAsCharity] = useState(false);
  const [charityName, setCharityName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [validated, setValidated] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0 && fname.length > 0 && lname.length > 0;
  }

  function handleSubmit(event) {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);


    if (validateForm()) {

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: fname, lastName: lname, email: email, password: password, isCharity: asCharity, role: 1 })
      };

      fetch(`${process.env.baseURL}/signup`, requestOptions).then(response => response.json())
        .then(user => console.log(user));
    }



    event.preventDefault();
  }

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Please do login" />
      </Helmet>
      <Layout title={'Signup'} description={'Enter your detail below.'}>
        <div className="signup-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="fname" bssize="large" style={{ position: 'relative' }}>

              <div className="formsDiv">
                <svg id="Layer_1" height="20" viewBox="0 0 480.001 480.001" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m319.427 342.172c-11.782 0-22.472-6-28.594-16.051-2.299-3.774-7.222-4.97-10.994-2.671-3.772 2.298-4.969 7.221-2.67 10.994 4.258 6.99 10.022 12.634 16.732 16.673l-8.291 37.627-19.989-23.017c3.629-4.172 2.753-9.046-.373-11.764-3.332-2.898-8.386-2.547-11.286.787l-14.066 16.176-35.432-39.369c3.015-5.79 4.843-12.146 5.365-18.77 68.574 20.186 137.171-31.569 137.171-102.662v-66.125c0-4.418-3.582-8-8-8s-8 3.582-8 8v66.125c0 50.177-40.822 91-91 91s-91-40.822-91-91v-67.893c19.503-1.107 36.092-13.352 42.004-35.544 33.31 21.332 70.648 35.153 109.832 40.638 4.392.612 8.422-2.451 9.032-6.814.612-4.375-2.438-8.419-6.813-9.032-39.9-5.585-78.836-20.518-113.433-45.01-5.289-3.746-12.654.065-12.622 6.581.001.199-.074 20.04-15.124 29.094-9.517 5.726-19.143 3.877-20.799 3.859-4.089-.039-7.554 3.029-8.02 7.076-.088.774-.057-1.861-.057 64.016-5.344-2.772-9-8.288-9-14.636v-97.46c0-10.477 8.523-19 19-19 3.271 0 6.213-1.992 7.428-5.029 10.928-27.319 37-44.971 66.424-44.971h68.607c39.449 0 71.541 32.093 71.541 71.541v94.919c0 4.418 3.582 8 8 8s8-3.582 8-8v-94.919c0-48.27-39.27-87.541-87.541-87.541h-68.607c-34.32 0-64.917 19.63-79.285 50.421-16.728 2.619-29.567 17.128-29.567 34.579v97.46c0 15.305 10.708 28.168 25.081 31.621 1.493 40.859 26 75.943 60.919 92.639v2.11c0 8.913-3.476 17.287-9.787 23.581-11.193 11.161-25.298 9.761-23.642 9.761-45.636 0-82.571 36.93-82.571 82.571v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-36.795 29.775-66.572 66.573-66.571 3.501 0 6.996-.372 10.452-1.111l11.163 50.66c1.413 6.415 9.551 8.476 13.853 3.524l15.761-18.148-9.739 77.911c-.548 4.384 2.563 8.382 6.946 8.93 4.392.547 8.383-2.568 8.931-6.946l11.255-90.041c.509.565 4.956 5.552 5.526 6.055 3.302 2.898 8.332 2.604 11.268-.707 1.582-1.811-2.51 2.892 4.798-5.512l11.275 90.204c.547 4.378 4.537 7.494 8.931 6.946 4.384-.548 7.494-4.546 6.946-8.93l-9.739-77.911 15.761 18.148c4.308 4.961 12.442 2.88 13.853-3.524l11.163-50.662c3.389.72 6.883 1.112 10.451 1.112 36.794.001 66.572 29.775 66.572 66.573v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-45.637-36.931-82.573-82.573-82.571zm-125.037 46.572-8.293-37.638c3.05-1.842 5.911-4.035 8.548-6.543l19.396 21.552z" /></svg>

              </div>
              {/* <input
                className="form-input form-control"
                placeholder="First Name"
                type="text"
                value={fname}
                onChange={e => setFname(e.target.value)} /> */}


              <Form.Control
                required
                placeholder="First Name"
                type="text"
                className="form-input"
                value={fname}
                onChange={e => setFname(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Enter your first name
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="lname" bssize="large" style={{ position: 'relative' }}>

              <div className="formsDiv">
                <svg id="Layer_1" height="20" viewBox="0 0 480.001 480.001" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m319.427 342.172c-11.782 0-22.472-6-28.594-16.051-2.299-3.774-7.222-4.97-10.994-2.671-3.772 2.298-4.969 7.221-2.67 10.994 4.258 6.99 10.022 12.634 16.732 16.673l-8.291 37.627-19.989-23.017c3.629-4.172 2.753-9.046-.373-11.764-3.332-2.898-8.386-2.547-11.286.787l-14.066 16.176-35.432-39.369c3.015-5.79 4.843-12.146 5.365-18.77 68.574 20.186 137.171-31.569 137.171-102.662v-66.125c0-4.418-3.582-8-8-8s-8 3.582-8 8v66.125c0 50.177-40.822 91-91 91s-91-40.822-91-91v-67.893c19.503-1.107 36.092-13.352 42.004-35.544 33.31 21.332 70.648 35.153 109.832 40.638 4.392.612 8.422-2.451 9.032-6.814.612-4.375-2.438-8.419-6.813-9.032-39.9-5.585-78.836-20.518-113.433-45.01-5.289-3.746-12.654.065-12.622 6.581.001.199-.074 20.04-15.124 29.094-9.517 5.726-19.143 3.877-20.799 3.859-4.089-.039-7.554 3.029-8.02 7.076-.088.774-.057-1.861-.057 64.016-5.344-2.772-9-8.288-9-14.636v-97.46c0-10.477 8.523-19 19-19 3.271 0 6.213-1.992 7.428-5.029 10.928-27.319 37-44.971 66.424-44.971h68.607c39.449 0 71.541 32.093 71.541 71.541v94.919c0 4.418 3.582 8 8 8s8-3.582 8-8v-94.919c0-48.27-39.27-87.541-87.541-87.541h-68.607c-34.32 0-64.917 19.63-79.285 50.421-16.728 2.619-29.567 17.128-29.567 34.579v97.46c0 15.305 10.708 28.168 25.081 31.621 1.493 40.859 26 75.943 60.919 92.639v2.11c0 8.913-3.476 17.287-9.787 23.581-11.193 11.161-25.298 9.761-23.642 9.761-45.636 0-82.571 36.93-82.571 82.571v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-36.795 29.775-66.572 66.573-66.571 3.501 0 6.996-.372 10.452-1.111l11.163 50.66c1.413 6.415 9.551 8.476 13.853 3.524l15.761-18.148-9.739 77.911c-.548 4.384 2.563 8.382 6.946 8.93 4.392.547 8.383-2.568 8.931-6.946l11.255-90.041c.509.565 4.956 5.552 5.526 6.055 3.302 2.898 8.332 2.604 11.268-.707 1.582-1.811-2.51 2.892 4.798-5.512l11.275 90.204c.547 4.378 4.537 7.494 8.931 6.946 4.384-.548 7.494-4.546 6.946-8.93l-9.739-77.911 15.761 18.148c4.308 4.961 12.442 2.88 13.853-3.524l11.163-50.662c3.389.72 6.883 1.112 10.451 1.112 36.794.001 66.572 29.775 66.572 66.573v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-45.637-36.931-82.573-82.573-82.571zm-125.037 46.572-8.293-37.638c3.05-1.842 5.911-4.035 8.548-6.543l19.396 21.552z" /></svg>

              </div>
              {/* <input
                  className="form-input form-control"
                  placeholder="Last Name"
                  type="text"
                  value={lname}
                  onChange={e => setLname(e.target.value)} />
               */}
              <Form.Control
                required
                className="form-input"
                placeholder="Last Name"
                type="text"
                value={lname}
                onChange={e => setLname(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Enter your last name
            </Form.Control.Feedback>

            </Form.Group>

            <Form.Group controlid="email" bssize="large" style={{ position: 'relative' }}>

              <div className="formsDiv" >

                <svg id="Capa_1" className="icons" style={{ color: '#818386' }} height="20" viewBox="0 0 512.627 512.627" width="20" xmlns="http://www.w3.org/2000/svg"><g>
                  <path d="M485.743,85.333H26.257C11.815,85.333,0,97.148,0,111.589V400.41c0,14.44,11.815,26.257,26.257,26.257h459.487
			c14.44,0,26.257-11.815,26.257-26.257V111.589C512,97.148,500.185,85.333,485.743,85.333z M475.89,105.024L271.104,258.626
			c-3.682,2.802-9.334,4.555-15.105,4.529c-5.77,0.026-11.421-1.727-15.104-4.529L36.109,105.024H475.89z M366.5,268.761
			l111.59,137.847c0.112,0.138,0.249,0.243,0.368,0.368H33.542c0.118-0.131,0.256-0.23,0.368-0.368L145.5,268.761
			c3.419-4.227,2.771-10.424-1.464-13.851c-4.227-3.419-10.424-2.771-13.844,1.457l-110.5,136.501V117.332l209.394,157.046
			c7.871,5.862,17.447,8.442,26.912,8.468c9.452-0.02,19.036-2.6,26.912-8.468l209.394-157.046v275.534L381.807,256.367
			c-3.42-4.227-9.623-4.877-13.844-1.457C363.729,258.329,363.079,264.534,366.5,268.761z"/></g></svg>
              </div>



              <Form.Control
                required
                className="form-input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Enter valid email
            </Form.Control.Feedback>

            </Form.Group>

            <Form.Group controlid="password" bssize="large" style={{ position: 'relative' }}>
              <div className="formsDiv">
                <svg id="Capa_1" style={{ color: '#818386' }} height="20" viewBox="0 0 512.627 512.627" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m479.153 296.256h-25.919c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h25.919c10.187 0 18.474 8.287 18.474 18.474v93.798c0 10.187-8.287 18.474-18.474 18.474h-445.679c-10.187 0-18.474-8.287-18.474-18.474v-93.798c0-10.187 8.287-18.474 18.474-18.474h387.799c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-32.318c.051-1.486.085-2.968.085-4.435 0-37.293-15.877-73.042-43.56-98.082-2.699-2.441-6.006-4.048-9.551-4.688v-15.839c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v15.524h-21v-53.996c0-23.774-19.342-43.116-43.116-43.116s-43.116 19.342-43.116 43.116v53.996h-21v-53.996c0-35.354 28.762-64.116 64.116-64.116s64.116 28.762 64.116 64.116v6.509c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-6.509c0-43.625-35.491-79.116-79.116-79.116s-79.116 35.491-79.116 79.116v54.31c-3.545.639-6.852 2.246-9.549 4.686-7.675 6.943-14.535 14.782-20.387 23.299-2.346 3.414-1.48 8.083 1.934 10.429 3.416 2.347 8.084 1.48 10.429-1.934 5.192-7.556 11.277-14.509 18.088-20.67.802-.725 1.855-1.125 2.966-1.125h151.271c1.111 0 2.167.4 2.971 1.127 24.544 22.2 38.621 53.895 38.621 86.957 0 1.465-.037 2.947-.094 4.435h-85.627l-4.35-13.864c5.667-6.869 8.499-15.568 7.974-24.496-1.041-17.72-15.185-31.911-32.898-33.011-9.822-.603-19.178 2.755-26.329 9.475-7.051 6.627-11.095 15.975-11.095 25.648 0 8.142 2.847 16.083 8.016 22.36.034.042.048.077.063.063l-4.378 13.824h-85.629c-.031-.818-.077-1.642-.09-2.451-.235-14.256 2.063-28.227 6.829-41.526 1.397-3.899-.63-8.193-4.53-9.59-3.898-1.398-8.193.631-9.59 4.53-5.378 15.007-7.971 30.764-7.707 46.834.012.728.056 1.469.081 2.204h-91.213c-18.458.002-33.474 15.018-33.474 33.476v93.798c0 18.458 15.016 33.474 33.474 33.474h445.68c18.457 0 33.474-15.016 33.474-33.474v-93.798c-.001-18.458-15.018-33.474-33.475-33.474zm-250.456-161.515c0-15.503 12.613-28.116 28.116-28.116s28.116 12.613 28.116 28.116v53.996h-56.232zm12.519 138.092c-3.006-3.65-4.595-8.084-4.595-12.824 0-5.632 2.261-10.858 6.367-14.718 4.102-3.855 9.484-5.781 15.126-5.434 9.985.62 18.267 8.93 18.854 18.92.303 5.135-1.32 10.132-4.57 14.07-3.276 3.972-4.316 9.236-2.782 14.08l2.954 9.329h-31.513l2.954-9.327c1.532-4.842.488-10.111-2.795-14.096z" /><path d="m230.535 376.629c0 14.214 11.564 25.779 25.779 25.779s25.779-11.564 25.779-25.779-11.564-25.779-25.779-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.836 10.779-10.779 10.779s-10.779-4.835-10.779-10.779 4.835-10.779 10.779-10.779 10.779 4.836 10.779 10.779z" /><path d="m149.204 376.629c0 14.214 11.564 25.779 25.779 25.779s25.779-11.564 25.779-25.779-11.564-25.779-25.779-25.779c-14.214 0-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.779 10.779-5.943 0-10.779-4.835-10.779-10.779s4.835-10.779 10.779-10.779 10.779 4.836 10.779 10.779z" /><path d="m67.874 376.629c0 14.214 11.564 25.779 25.779 25.779 14.214 0 25.779-11.564 25.779-25.779s-11.564-25.779-25.779-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.779 10.779s-10.779-4.835-10.779-10.779 4.835-10.779 10.779-10.779c5.943 0 10.779 4.836 10.779 10.779z" /><path d="m311.865 376.629c0 14.214 11.564 25.779 25.778 25.779 14.215 0 25.779-11.564 25.779-25.779s-11.564-25.779-25.779-25.779c-14.213 0-25.778 11.565-25.778 25.779zm36.558 0c0 5.943-4.836 10.779-10.779 10.779s-10.778-4.835-10.778-10.779 4.835-10.779 10.778-10.779 10.779 4.836 10.779 10.779z" /><path d="m393.195 376.629c0 14.214 11.564 25.779 25.779 25.779 14.214 0 25.778-11.564 25.778-25.779s-11.564-25.779-25.778-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.778 10.779s-10.779-4.835-10.779-10.779 4.836-10.779 10.779-10.779 10.778 4.836 10.778 10.779z" /></g></svg>

              </div>


              <Form.Control
                required
                className="form-input"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
              />

              <Form.Control.Feedback type="invalid">
                Password missing
            </Form.Control.Feedback>

            </Form.Group>

            <Form.Group controlId="asCharity">
              <Form.Check type="checkbox"
                label="Signup as a charity"
                onChange={e => setAsCharity(e.target.value)} />
            </Form.Group>

            {
              asCharity ? <div>
                <Form.Group controlId="charityName" bssize="large">

                  <Form.Control
                    placeholder="Charity Name"
                    type="text"
                    value={charityName}
                    onChange={e => setCharityName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="registrationNumber" bssize="large">

                  <Form.Control
                    placeholder="Registration Number"
                    type="text"
                    value={registrationNumber}
                    onChange={e => setRegistrationNumber(e.target.value)}
                  />
                </Form.Group>
              </div> : null
            }
            <Button block bssize="large" type="submit" className="submitBtn">Signup</Button>
          </Form>
        </div>

      </Layout>
    </div>
  );
}

Singup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singup: makeSelectSingup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Singup);
