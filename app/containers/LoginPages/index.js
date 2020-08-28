import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Image, Form, Row, Col } from 'react-bootstrap';

import './login.css'

const logo = require('../../images/logo.png');

export default function Loginpage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remeberme, setRemeberMe] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    function handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        };
        fetch('http://192.168.18.119:4000/signin', requestOptions).then(response => console.log(response))
           
        event.preventDefault();
    }





    return (
        <div className="main-div">
            <div className="container">
                <div className="main-container">
                    <div className="inner-box">
                        <div className="row">
                            <div className="col-6">
                                <div className=" pag1" >
                                    <div className="logo">
                                        <Image src={logo} fluid />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 secondCol">
                                <div className="formDiv">
                                    <div className="heading">
                                        <h1 className="header">Login</h1>
                                        <div className="bar"></div>
                                    </div>

                                    <p className="para">When we wanted to make a real difference, we created Right Fund.</p>

                                    <div className="Login">
                                        <form onSubmit={handleSubmit}>
                                            <Form.Group controlId="email" bsSize="large">

                                                <Form.Control
                                                    autoFocus
                                                    placeholder="Email"
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="password" bsSize="large">

                                                <Form.Control
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    type="password"
                                                />
                                            </Form.Group>
                                            <Form.Group  >

                                                <Form.Row>
                                                    <Col controlId="remeberme">
                                                        <Form.Check className="remberMeLabel" label="Remember me" />
                                                    </Col>
                                                    <Col className="forgetPass">
                                                        <Form.Label className="forgetPassLabel">Forget Password</Form.Label>
                                                    </Col>
                                                </Form.Row>
                                            </Form.Group>
                                            <Button block bsSize="large" disabled={!validateForm()} type="submit" className="btn">Login</Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}