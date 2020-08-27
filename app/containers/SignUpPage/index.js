import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Image, Form } from 'react-bootstrap';

import './signUp.css'

const logo = require('../../images/logo.png');

export default function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && fname.length > 0 && lname.length > 0;
    }

    function handleSubmit(event) {
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
                                        <h1 className="header">Signup</h1>
                                        <div className="bar"></div>
                                    </div>

                                    <p className="para">When we wanted to make a real difference, we created Right Fund.</p>

                                    <div className="Login">
                                        <form onSubmit={handleSubmit}>
                                            <Form.Group controlId="fname" bsSize="large">

                                                <Form.Control
                                                    autoFocus
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={fname}
                                                    onChange={e => setFname(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="lname" bsSize="large">

                                                <Form.Control
                                                    autoFocus
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={lname}
                                                    onChange={e => setLname(e.target.value)}
                                                />
                                            </Form.Group>
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
                                            <Button block bsSize="large" disabled={!validateForm()} type="submit" className="btn">Signup</Button>
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