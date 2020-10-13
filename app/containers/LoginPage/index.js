/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import './login.scss';

import { Helmet } from 'react-helmet';

import { Button, Form, Col, Spinner } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { SnackbarProvider, useSnackbar } from 'notistack';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Layout from '../../components/AuthLayout';
import reducer from './reducer';
import makeSelectLoginPage from './selectors';
import { login } from '../../utils/crud/auth.crud';
import { authActions } from '../../utils/action-creators/auth.action.creator';

const CustomCheckbox = withStyles({
  root: {
    color: '#f15a24',
    '&$checked': {
      color: '#f15a24',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });

  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remeberme, setRemeberMe] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function resetField() {
    setEmail('');
    setPassword('');
    setRemeberMe(false);
  }

  const handleClickVariant = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (validateForm()) {
      setLoading(true);
   
      login(email, password)
        .then(({ data, status }) => {
          console.log('res', data.response?.data);
          console.log('status', status);
          setLoading(false);
          if (status === 200) {
            handleClickVariant('success', data.response.message);

            // resetField();
            // props.history.push('/');
            if (data.response?.data.res.statusId.name === "NOTACTIVE") {
              props.login({
                user: data.response?.data?.res,
              });
              props.history.push('/accountVerification');
            } else {

              props.login({
                token: data.response?.data?.token,
                user: data.response?.data?.res,
              });
              localStorage.setItem('token', data.response.data.token);
              props.history.push('/');
            }
          } else {
            handleClickVariant('error', data.response.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
      // fetch(`${process.env.baseURL}/signin`, requestOptions)
      //   .then(response => response.json())
      //   .then(user => {
      //     setLoading(false);
      //     console.log(user);
      //     if (user.statusCode == 200) {
      //       handleClickVariant('success', user.response.message);
      //       localStorage.setItem('token', user.response.data.token);
      //       resetField();
      //       props.history.push('/');
      //     } else {
      //       handleClickVariant('error', user.response.message);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  }

  const onChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Please do login" />
      </Helmet>
      <Layout
        title="Login"
        description="When we wanted to make a real difference, we created Right Fund"
      >
        <div className="loginForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              controlId="email"
              bssize="large"
              style={{ position: 'relative' }}
            >
              <div className="formsDiv">
                <svg
                  id="Capa_1"
                  className="icons"
                  style={{ color: '#818386' }}
                  height="20"
                  viewBox="0 0 512.627 512.627"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M485.743,85.333H26.257C11.815,85.333,0,97.148,0,111.589V400.41c0,14.44,11.815,26.257,26.257,26.257h459.487
			c14.44,0,26.257-11.815,26.257-26.257V111.589C512,97.148,500.185,85.333,485.743,85.333z M475.89,105.024L271.104,258.626
			c-3.682,2.802-9.334,4.555-15.105,4.529c-5.77,0.026-11.421-1.727-15.104-4.529L36.109,105.024H475.89z M366.5,268.761
			l111.59,137.847c0.112,0.138,0.249,0.243,0.368,0.368H33.542c0.118-0.131,0.256-0.23,0.368-0.368L145.5,268.761
			c3.419-4.227,2.771-10.424-1.464-13.851c-4.227-3.419-10.424-2.771-13.844,1.457l-110.5,136.501V117.332l209.394,157.046
			c7.871,5.862,17.447,8.442,26.912,8.468c9.452-0.02,19.036-2.6,26.912-8.468l209.394-157.046v275.534L381.807,256.367
			c-3.42-4.227-9.623-4.877-13.844-1.457C363.729,258.329,363.079,264.534,366.5,268.761z"
                    />
                  </g>
                </svg>
              </div>

              <Form.Control
                required
                className="form-input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Enter valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="password"
              bssize="large"
              style={{ position: 'relative' }}
            >
              <div className="formsDiv">
                <svg
                  id="Capa_1"
                  style={{ color: '#818386' }}
                  height="20"
                  viewBox="0 0 512.627 512.627"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="m479.153 296.256h-25.919c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h25.919c10.187 0 18.474 8.287 18.474 18.474v93.798c0 10.187-8.287 18.474-18.474 18.474h-445.679c-10.187 0-18.474-8.287-18.474-18.474v-93.798c0-10.187 8.287-18.474 18.474-18.474h387.799c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-32.318c.051-1.486.085-2.968.085-4.435 0-37.293-15.877-73.042-43.56-98.082-2.699-2.441-6.006-4.048-9.551-4.688v-15.839c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v15.524h-21v-53.996c0-23.774-19.342-43.116-43.116-43.116s-43.116 19.342-43.116 43.116v53.996h-21v-53.996c0-35.354 28.762-64.116 64.116-64.116s64.116 28.762 64.116 64.116v6.509c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-6.509c0-43.625-35.491-79.116-79.116-79.116s-79.116 35.491-79.116 79.116v54.31c-3.545.639-6.852 2.246-9.549 4.686-7.675 6.943-14.535 14.782-20.387 23.299-2.346 3.414-1.48 8.083 1.934 10.429 3.416 2.347 8.084 1.48 10.429-1.934 5.192-7.556 11.277-14.509 18.088-20.67.802-.725 1.855-1.125 2.966-1.125h151.271c1.111 0 2.167.4 2.971 1.127 24.544 22.2 38.621 53.895 38.621 86.957 0 1.465-.037 2.947-.094 4.435h-85.627l-4.35-13.864c5.667-6.869 8.499-15.568 7.974-24.496-1.041-17.72-15.185-31.911-32.898-33.011-9.822-.603-19.178 2.755-26.329 9.475-7.051 6.627-11.095 15.975-11.095 25.648 0 8.142 2.847 16.083 8.016 22.36.034.042.048.077.063.063l-4.378 13.824h-85.629c-.031-.818-.077-1.642-.09-2.451-.235-14.256 2.063-28.227 6.829-41.526 1.397-3.899-.63-8.193-4.53-9.59-3.898-1.398-8.193.631-9.59 4.53-5.378 15.007-7.971 30.764-7.707 46.834.012.728.056 1.469.081 2.204h-91.213c-18.458.002-33.474 15.018-33.474 33.476v93.798c0 18.458 15.016 33.474 33.474 33.474h445.68c18.457 0 33.474-15.016 33.474-33.474v-93.798c-.001-18.458-15.018-33.474-33.475-33.474zm-250.456-161.515c0-15.503 12.613-28.116 28.116-28.116s28.116 12.613 28.116 28.116v53.996h-56.232zm12.519 138.092c-3.006-3.65-4.595-8.084-4.595-12.824 0-5.632 2.261-10.858 6.367-14.718 4.102-3.855 9.484-5.781 15.126-5.434 9.985.62 18.267 8.93 18.854 18.92.303 5.135-1.32 10.132-4.57 14.07-3.276 3.972-4.316 9.236-2.782 14.08l2.954 9.329h-31.513l2.954-9.327c1.532-4.842.488-10.111-2.795-14.096z" />
                    <path d="m230.535 376.629c0 14.214 11.564 25.779 25.779 25.779s25.779-11.564 25.779-25.779-11.564-25.779-25.779-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.836 10.779-10.779 10.779s-10.779-4.835-10.779-10.779 4.835-10.779 10.779-10.779 10.779 4.836 10.779 10.779z" />
                    <path d="m149.204 376.629c0 14.214 11.564 25.779 25.779 25.779s25.779-11.564 25.779-25.779-11.564-25.779-25.779-25.779c-14.214 0-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.779 10.779-5.943 0-10.779-4.835-10.779-10.779s4.835-10.779 10.779-10.779 10.779 4.836 10.779 10.779z" />
                    <path d="m67.874 376.629c0 14.214 11.564 25.779 25.779 25.779 14.214 0 25.779-11.564 25.779-25.779s-11.564-25.779-25.779-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.779 10.779s-10.779-4.835-10.779-10.779 4.835-10.779 10.779-10.779c5.943 0 10.779 4.836 10.779 10.779z" />
                    <path d="m311.865 376.629c0 14.214 11.564 25.779 25.778 25.779 14.215 0 25.779-11.564 25.779-25.779s-11.564-25.779-25.779-25.779c-14.213 0-25.778 11.565-25.778 25.779zm36.558 0c0 5.943-4.836 10.779-10.779 10.779s-10.778-4.835-10.778-10.779 4.835-10.779 10.778-10.779 10.779 4.836 10.779 10.779z" />
                    <path d="m393.195 376.629c0 14.214 11.564 25.779 25.779 25.779 14.214 0 25.778-11.564 25.778-25.779s-11.564-25.779-25.778-25.779-25.779 11.565-25.779 25.779zm36.558 0c0 5.943-4.835 10.779-10.778 10.779s-10.779-4.835-10.779-10.779 4.836-10.779 10.779-10.779 10.778 4.836 10.778 10.779z" />
                  </g>
                </svg>
              </div>

              <Form.Control
                required
                value={password}
                type="password"
                className="form-input"
                placeholder="Password"
                onChange={onChange}
              />

              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col controlid="remeberme">
                  <FormControlLabel
                    control={<CustomCheckbox />}
                    label="Remember me"
                  />
                </Col>
                <Col className="forgetPass">
                  <Link className="forgetPassLabel" to="/forgetPassword">
                    Forget Password
                  </Link>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col controlid="terms">
                  <FormControlLabel
                    classes={{ label: 'loginCheckbox' }}
                    control={<CustomCheckbox />}
                    label="Terms & conditions"
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Button block bssize="large" type="submit" className="submitBtn">
              {' '}
              {loading == false && <div>Login</div>}
              {loading && <Spinner animation="border" size="sm" />}{' '}
            </Button>
          </Form>
          <div className="signupBtn">
            <Link className="forgetPassLabel" to="/signup">
              Register yourself
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  null,
  authActions,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
