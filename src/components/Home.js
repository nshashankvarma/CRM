import { Button, Container, Navbar, Toast, ToastContainer    } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/userModel';
import './Home.css'

const Home = () => {
    const [showToastS, setShowToastS] = useState(false);
    const [showToastD, setShowToastD] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        companies: [],
        loggedIn: true
    })
    const history = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3001/home").then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(jsonRes => {
                const newUser = {
                    email: jsonRes.docs.email,
                    password: jsonRes.docs.password,
                    companies: jsonRes.docs.companies,
                    loggedIn: jsonRes.docs.loggedIn
                }
                setUser(jsonRes.docs)
                setShowToastS(true)
            }).catch(e => {
                console.log("Check Email and password");
                setShowToastD(true)
                setTimeout(()=>history("/login"), 500) 

                // alert("Check Email and password")
            })
        }, 1000)
    }, [])
    const handleLogoutClick = () => {
        const doc = User.findOne({ email: user.email }, (err, doc) => {
            if (!err) {
                doc.loggedIn = false
                doc.save()
            }
        })

        history("/login")
    }
    return (
        <div>
            <ToastContainer position="top-end"  style={{zIndex: 10}}>
                <Toast onClose={() => setShowToastS(false)} bg="success" show={showToastS} delay={2000} autohide >
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Log In Successful</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Lets Go!</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end"  style={{zIndex: 10}}>
                <Toast onClose={() => setShowToastD(false)} bg="danger" show={showToastD} delay={2000} autohide >
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Log In Failed</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Check email and password</Toast.Body>
                </Toast>
            </ToastContainer>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="https://www.superoffice.co.uk/globalassets/home-com-website/resources/articles/visuals/what-is-crm/crm_top.jpg"
                            width="50"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Customer Management
                    </Navbar.Brand>
                    <span onClick={handleLogoutClick} className="logout">Logout</span>
                </Container>
            </Navbar>
            <div>
                <h2>Company | Owner</h2>
                {user['companies'].map(function (company) {
                    return (
                        <div className="listItem">
                            <h3>{company.name} - {company.owner}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;