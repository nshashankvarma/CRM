import React, { useState, useEffect } from 'react';
import { Button, Form ,Card, Container} from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import background from "./tile_background.jpeg";

const Login = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const [button, setButton] = useState(false)

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
    const handleCheckBox = ()=>{
            setButton(!button)
    }

    return (
        <div>
        <div>
        {/* // <div className="body">
        //     <div className="login">
        //         <h1>Login</h1>
        //          <Form>
        //             <Form.Group className="mb-3" controlId="formBasicEmail">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
        //                 <Form.Text className="text-muted">
        //                     We'll never share your email with anyone else.
        //                 </Form.Text>
        //             </Form.Group>
                    
        //             <Form.Group className="mb-3" controlId="formBasicPassword">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
        //             </Form.Group>
        //             <Button variant="primary" type="submit" onClick={handleLoginClick}>
        //                 Submit
        //             </Button>
        //         </Form> 
        //     </div>
        //     <div className="signup" >
        //         <h1>SignUp</h1>
        //         <Form>
        //             <Form.Group className="mb-3" controlId="formBasicEmail">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" required />
        //                 <Form.Text className="text-muted">
        //                     We'll never share your email with anyone else.
        //                 </Form.Text>
        //             </Form.Group>

        //             <Form.Group className="mb-3" controlId="formBasicText">
        //                 <Form.Label>Name</Form.Label>
        //                 <Form.Control onChange={handleChange} type="text" placeholder="Name" name="name"  required/>
        //             </Form.Group>

        //             <Form.Group className="mb-3" controlId="formBasicText">
        //                 <Form.Label>Phone Number: </Form.Label>
        //                 <Form.Control onChange={handleChange} type="phone" placeholder="Phone" name="phone" />
        //             </Form.Group>

        //             <Form.Group className="mb-3" controlId="formBasicPassword">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password"  required/>
        //             </Form.Group>
        //             <Form.Group className="mb-3" controlId="formBasicCheckbox">
        //                 <Form.Check type="checkbox" label="Check me out" />
        //             </Form.Group>
        //             <Link to="/home">
        //                 <Button variant="primary" type="submit" onClick={handleSignupClick}>
        //                     Submit
        //                 </Button>
        //             </Link>
        //         </Form>
        //     </div>
        // </div > */}
        </div>
        <div style={{
            // backgroundImage: `url(${background})`,
            backgroundColor: 'rgb(57, 57, 124)',
            backgroundRepeat: "repeat",
            minHeight: "100vh"
        }}>
        <div className="body">
            <Container>
            <Card className="loginCard p-4" style={{ borderRadius: '0.5rem', width:"35rem", height:"35rem"}}>
            <div className="login">
                <h1 style={{textAlign:"center"}}>Login</h1>
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
                    <Button className="button" variant="primary" type="submit" onClick={handleLoginClick} style={{marginLeft:"5rem", width:"20rem", marginTop:"14rem"}}>
                        Submit
                    </Button>
                </Form> 
            </div>
            </Card>
            </Container>
            <Container>
            <Card className="signupCard p-4" style={{ borderRadius: '0.5rem',flex:'1',width:'35rem'}}>
            <div className="signup" >
                <h1 style={{textAlign:"center"}}>SignUp</h1>
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
                        <Form.Check type="checkbox" label="Accept terms and conditions" onChange={handleCheckBox} />
                    </Form.Group>
                    <Link to="/home">
                        <Button className="submit" variant="primary" disabled={!button} type="submit" onClick={handleSignupClick} style={{marginLeft:"5rem", width:"20rem",}}>
                            Submit
                        </Button>
                    </Link>
                </Form>
            </div>
            </Card>
            </Container>
        </div >
        </div>
        </div>
    );
};

export default Login;