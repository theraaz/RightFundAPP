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
    const [asCharity, setAsCharity] = useState(false);
    const [charityName, setCharityName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && fname.length > 0 && lname.length > 0;
    }

    function handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: fname, lastName: lname, email: email, password: password, isCharity: asCharity })
        };
        fetch('http://192.168.18.119:4000/signup', requestOptions).then(response => response.json())
            .then(user => console.log(user));
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

                                    <p className="para">Enter your detail below.</p>

                                    <div className="Login">
                                        <form onSubmit={handleSubmit}>
                                            <Form.Group controlId="fname" bssize="large">

                                                <Form.Control
                                                    autoFocus
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={fname}
                                                    onChange={e => setFname(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="lname" bssize="large">

                                                <Form.Control
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={lname}
                                                    onChange={e => setLname(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="email" bssize="large">

                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="password" bssize="large">

                                                <Form.Control
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    type="password"
                                                />
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
                                            <Button block bssize="large" disabled={!validateForm()} type="submit" className="btn">Signup</Button>
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