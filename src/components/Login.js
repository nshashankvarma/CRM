import React, { useState, useEffect } from 'react';
import { Button, Form ,Card, Container} from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import background from "./tile_background.jpeg";

const Login = () => {
    const navigate = useNavigate()

    const [input, setInput] = useState({
        email: '',
        password: '',
        name: '',
        phone:'',
        loggedIn: false
    })
    // useEffect(()=>{
    //     fetch("http://localhost:3001/login").then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //     }).then(jsonRes=>{
    //         const newUser = {
    //             email: jsonRes.docs.email,
    //             password:jsonRes.docs.password,
    //             loggedIn: jsonRes.docs.loggedIn
    //         }
    //         if(input.password == newUser.password){
    //             console.log("Correct password")
    //         }
    //         else
    //         {
    //             console.log("Wrong Log In");
    //         }
    //     }).catch(e => console.log("Login Error(Login.js)"))
    // }, [])
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
        // e.preventDefault()
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
        // e.preventDefault()
        const newUser = {
            email: input.email,
            password: input.password,
            //name: input.name?input.name:'',
            // companies:[],
            // loggedIn: true
        }
        axios.post("http://localhost:3001/login", newUser)
        navigate("/home")
    }

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "repeat",
            minHeight: "100vh"
        }}>
        <div className="body">
            <Container>
            <Card className="loginCard p-4" style={{ borderRadius: '0.5rem',flex:'1',minWidth: '22rem',maxWidth: '30rem'}}>
            <div className="login">
                <h1>Login</h1>
                 <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="loginEmail" style={{ maxWidth: '20rem'}}>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" style={{ maxWidth: '20rem'}}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="loginPassword" style={{ maxWidth: '20rem'}}>Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" style={{ maxWidth: '20rem'}} />
                    </Form.Group>
                    <Button className="button" variant="primary" type="submit" onClick={handleLoginClick}>
                        Submit
                    </Button>
                </Form> 
            </div>
            </Card>
            </Container>
            <Container>
            <Card className="signupCard p-4" style={{ borderRadius: '0.5rem',flex:'1',minWidth:'22rem',maxWidth: '30rem'}}>
            <div className="signup" >
                <h1>SignUp</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="signUpEmail" style={{ maxWidth: '20rem'}}>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" style={{ maxWidth: '20rem'}} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label className="signUpName" style={{ maxWidth: '20rem'}}>Name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" placeholder="Name" name="name"  style={{ maxWidth: '20rem'}} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label className="signUpPh" style={{ maxWidth: '20rem'}}>Phone Number: </Form.Label>
                        <Form.Control onChange={handleChange} type="phone" placeholder="Phone" name="phone" style={{ maxWidth: '20rem'}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="signUpPassword" style={{ maxWidth: '20rem'}}>Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" style={{ maxWidth: '20rem'}}  required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Link to="/home">
                        <Button className="submit" variant="primary" type="submit" onClick={handleSignupClick}>
                            Submit
                        </Button>
                    </Link>
                </Form>
            </div>
            </Card>
            </Container>
        </div >
        </div>
        
    );
};

export default Login;