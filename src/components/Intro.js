import React from 'react';
import "./Intro.css"
import {Navbar, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router';
import img1 from './resources/img1.png'
import img2 from './resources/img2.png'
import img3 from './resources/img3.png'
import img4 from './resources/img4.png'

const Intro = () => {
    const history = useNavigate()
    const handleClick = ()=>{
        history("/login")
    }
    return (
        <div style={{backgroundColor:"rgb(57, 57, 124)"}}>
            <Navbar class="navBar" bg="dark" variant="dark">
                <Container class="navContainer">
                    <Navbar.Brand href="/home">
                        <img
                            alt=''
                            src='https://www.superoffice.co.uk/globalassets/home-com-website/resources/articles/visuals/what-is-crm/crm_top.jpg'
                            width='50'
                            height='30'
                            className='d-inline-block align-top'
                        />{' '}
                        Customer Management
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <body style={{backgroundColor:"rgb(57, 57, 124)"}}>
                <div id="main">
                    {/* <div id="topBar">
                        <div>
                            <img src='' />
                        </div>
                        <div>
                            LOG IN | SIGN UP
                        </div>
                    </div> */}

                    <div id="body1">
                        <div id="container">
                            <div id="title1">
                                Take your business to the next level with the PES CRM solution
                            </div>
                            <div id="parah1">
                                The key to making your business bigger and better is the capability to handle a large number of clients and bring their elaborate and visionary ideas to life with the skills of of your talented and experienced teams. The PES CRM solution helps you do just that.
                                <br /><br />
                                <a id="scroller1" href="#body2">Want to see how?</a>
                            </div>
                        </div>
                        <div>
                            <img id="img_one" src={img1} />
                        </div>
                    </div>


                    <div id="body2">
                        <div className="points">
                            <div className="pointtext">
                                <div id="title21" className="titlein">
                                    Access all your contacts, All from one place
                                </div>
                                <div id="parah21" className='parahIn'>
                                    Use a central repository which holds all your contacts in one place to efficiently initiate and manage conversations with your team and clients.
                                </div>
                            </div>
                            <img className="inImages" src={img2} />
                        </div>
                        <div className="points" id="reverse">
                            <div className="pointtext">
                                <div id="title22" className="titlein">
                                    Meet Deals
                                </div>
                                <div id="parah2" className='parahIn'>
                                    By encapsulating and streamlining all contacts and transactions with a client into the <b>Deal</b>, you can now easily access and manage all activity that occurs between your team and the client, from first contact to product delivery.
                                </div>
                            </div>
                            <img className="inImages" src={img3} />
                        </div>
                        <div className="points">
                            <div className="pointtext">
                                <div id="title23" className="titlein">
                                    Visualize your business
                                </div>
                                <div id="parah3" className='parahIn'    >
                                    See clear and conscise graphs that show you exactly how your business is faring, and what you need to focus on to move to greater heights.
                                </div>
                            </div>
                            <img className="inImages" src={img4} />
                        </div>
                    </div>
                    <div id="endbar">Start your Journey to the top with us Today.   <button id="getStarted" onClick={handleClick} style={{backgroundColor:"white", color:"rgb(64, 86, 185)", marginLeft:"2rem", padding:"0.1rem", borderRadius:"0.2rem"}}>Get Started</button></div>

                </div>

            </body>
        </div>
    );
};

export default Intro;