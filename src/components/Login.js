import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate()

    const [input, setInput] = useState({
        email: '',
        password: '',
        name: '',
        phone:'',
        loggedIn: false
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setInput(pres => {
            return {
                ...pres,
                [name]: value
            }
        })
    }
    const handleSignupClick = (e) => {
        const newUser = {
            email: input.email,
            password: input.password,
            name: input.name?input.name:'',
            phone: input.phone,
            companies:[],
            loggedIn: true
        }
        axios.post("http://localhost:3001/signup", newUser)
        navigate("/home")
    }
    const handleLoginClick = (e) => {
        const newUser = {
            email: input.email,
            password: input.password,
        }
        axios.post("http://localhost:3001/login", newUser)
        navigate("/home")
    }

    return (
        <div className="body">
            <div className="login">
                <h1>Login</h1>
                 <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleLoginClick}>
                        Submit
                    </Button>
                </Form> 
            </div>
            <div className="signup" >
                <h1>SignUp</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" placeholder="Name" name="name"  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Phone Number: </Form.Label>
                        <Form.Control onChange={handleChange} type="phone" placeholder="Phone" name="phone" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password"  required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Link to="/home">
                        <Button variant="primary" type="submit" onClick={handleSignupClick}>
                            Submit
                        </Button>
                    </Link>
                </Form>
            </div>
        </div >
    );
};

export default Login;