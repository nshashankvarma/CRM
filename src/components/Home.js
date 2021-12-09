import { Button, Container, Navbar, Card, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import User, { db } from '../models/userModel';
import Toaster from './Toast.js';
import './Home.css';
import axios from 'axios';
import AddDeal from './AddDeal';
import background from './tile_background.jpeg';
import DealItem from './DealItem';

const Home = () => {
    const [showToastS, setShowToastS] = useState(false);
    const [showToastD, setShowToastD] = useState(false);
    const [addDeal, setAddDeal] = useState(false);
    const [notify, showNotify] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        phone: '',
        company: '',
        name: '',
        loggedIn: true,
    });
    const [deal, setDeal] = useState([
        {
            title: '',
            partner1: '',
            partner2: '',
            email1: '',
            email2: '',
            priority:'',
            desc: '',
            price:0
        },
    ]);
    const history = useNavigate();

    const handleAddDeal = () => {
        setAddDeal(true);
        showNotify(true);
    };

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3001/home')
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        console.log('Check Email and password');
                        setShowToastD(true);
                        setTimeout(() => history('/login'), 500);
                    }
                })
                .then((jsonRes) => {
                    //setUser(jsonRes.docs)
                    let newDeals = [];
                    newDeals.push(...jsonRes.docs);
                    setDeal(newDeals);
                    setShowToastS(true);
                })
                .catch((e) => {
                    console.log('Check Email and password');
                    setShowToastD(true);
                    setTimeout(() => history('/login'), 500);

                    // alert("Check Email and password")
                });
        }, 1000);
        setTimeout(() => {
            fetch('http://localhost:3001/homeuser')
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        console.log('Check Email and password');
                        setShowToastD(true);
                        setTimeout(() => history('/login'), 500);
                    }
                })
                .then((jsonRes) => {
                    setUser(jsonRes.docs);
                    setShowToastS(true);
                })
                .catch((e) => {
                    console.log('Check Email and password');
                    setShowToastD(true);
                    setTimeout(() => history('/login'), 500);

                    // alert("Check Email and password")
                });
        }, 1000);
    }, []);

    const handleAnalyticsClick = async () => {
        history('/analytics');
    };
    const handleLogoutClick = async () => {
        axios.post('http://localhost:3001/logout', { email: user?.email });
        history('/login');
    };
    const handleProfileClick = (objId) => { };
    const deleteItem = (item) => {
        axios.post('http://localhost:3001/deletedeal', { title: item });
    };

    function compareDeal(deal1, deal2){
        if(deal2.price>deal1.price)
            return 1;
        if(deal2.price<deal1.price)
            return -1;
        else
            return 0;
    }

    return (
        <div
            style={{
                backgroundColor: 'rgb(57, 57, 124)',
                // backgroundColor:"#008C8C",
                backgroundRepeat: 'repeat',
                minHeight: '100vh',
            }}>
            <Toaster
                title='Login Successful'
                body='Congrats!'
                type='success'
                setShow={setShowToastS}
                show={showToastS}
            />
            <Toaster
                title='Login Fail'
                body='Check email and password'
                type='danger'
                setShow={setShowToastD}
                show={showToastD}
            />

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
                    <span onClick={handleAnalyticsClick} className='analytics' style={{color:"white",cursor:"pointer"}}>
                        Analytics
                    </span>
                    <span onClick={handleLogoutClick} className='logout'>
                        Logout
                    </span>
                </Container>
            </Navbar>
            <div className="layout" style={{
                padding: "2rem", display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
            }}>
                <Card className="profileCard p-4" style={{ borderRadius: '0.5rem',minWidth:"10rem",minHeight:"17.5rem",flex:'2' }}>
                    <Card.Title className="profileTitle"><b>Profile</b></Card.Title>

                    <div className='profileImage'>
                        <Card.Img src='https://freepngimg.com/download/facebook/62681-flat-icons-face-computer-design-avatar-icon.png' />
                    </div>

                    <Card.Body>
                        <Card.Text className='profileName'>
                            <div style={{ color: '#000000' }}>
                                <b>Name:</b>
                                {user?.name}
                            </div>
                        </Card.Text>
                        <Card.Text className='profileEmail'>
                            <div style={{ color: '#000000' }}>
                                <b>Email:</b>
                                {user?.email}
                            </div>
                        </Card.Text>
                        <Card.Text className='profileContact'>
                            <div style={{ color: '#000000' }}>
                                <b>Phone:</b>
                                {user?.phone}
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    className='dealsCard p-4'
                    style={{ borderRadius: '0.5rem',minWidth:"15rem",minHeight:"17.5rem",flex:'2' }}>
                    <Card.Title className='dealsTitle'>Deals</Card.Title>
                    <Card.Body className='dealsBody'>
                        <div className='dealRow'>
                            <div>Title</div>
                            <div>Partner</div>
                            <div>Description</div>
                        </div>
                        {deal.map((d) => {
                            return (
                                <div className='dealRow' style={{backgroundColor:(d.priority == 'High')?'#ffcbad':(d.priority == 'Medium')?'#f7ffb0':'#c2ffb0'}}>
                                    {}
                                    <div>{d.title}</div>
                                    {d.partner1 != user?.name ? (
                                        <Link to={`/profile/${d.partner1}`}>
                                            {d.partner1}
                                        </Link>
                                    ) : (
                                        <Link to={`/profile/${d.partner2}`}>
                                            {d.partner2}
                                        </Link>
                                    )}
                                    <div>{d.desc ? d.desc : ' '}</div>
                                    <AiFillDelete
                                        onClick={() => deleteItem(d.title)}
                                    />
                                </div>
                            );
                        })}
                        <Button
                            onClick={handleAddDeal}
                            style={{
                                marginLeft: '15rem',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                            }}>
                            + Add
                        </Button>
                        {addDeal && (
                            <AddDeal
                                show={addDeal}
                                onHide={() => setAddDeal(false)}
                                name={user?.name}
                                email={user?.email}
                            />
                        )}
                    </Card.Body>
                    
                </Card>
                {/* <Card className="dealsCard p-4" style={{ borderRadius: '0.5rem',minWidth:"20rem",flex:'2',minHeight:"35rem" }}>
                    <Card.Title className="dealsTitle">Deals</Card.Title>
                    <Card.Body className="dealsBody">
                        <div className="dealRow"><div>Title</div><div>Partner</div><div>Description</div></div>
                        {deal.map((d) => { return (<div className="dealRow"><div>{d.title}</div>{(d.partner1 != user.name) ? <Link to={`/profile/${d.partner1}`}>{d.partner1}</Link> : <Link to={`/profile/${d.partner2}`}>{d.partner2}</Link>}<div>{d.desc ? d.desc : ' '}</div><AiFillDelete onClick={deleteItem(d.title)}/></div>) })}
                        <Button onClick={handleAddDeal} style={{ marginLeft: "15rem", textAlign: "center", marginTop: "0.5rem" }}>+ Add</Button>
                        {addDeal && <AddDeal show={addDeal} onHide={() => setAddDeal(false)} name={user.name} email={user.email} />}
                    </Card.Body>
                </Card> */}
                <div className='rightbar'>
                    <Container>
                        <Card className="notificationsCard p-4" style={{ borderRadius: '0.5rem', minWidth: "15rem", minHeight: "17.5rem", flex: '2' }}>
                            <Card.Title className="notificationTitle">Notifications</Card.Title>
                            <Card.Body className="notificationBody">

                                {notify && <Card.Text className="notification">New Deal Added</Card.Text>}
                                <div>
                                    <div>Total High Priority:{deal.filter(x => x.priority=="High").length}</div>
                                    <div>Total Medium Priority:{deal.filter(x => x.priority=="Medium").length}</div>
                                    <div>Total Low Priority:{deal.filter(x => x.priority=="Low").length}</div>
                                </div>
                            </Card.Body>
                        </Card>
                        
                    </Container>
                    <Container>
                        <Card className="crucialDealsCard p-4" style={{ borderRadius: '0.5rem', minWidth: "30rem", minHeight: "17.5rem", flex: '2' }}>
                            <Card.Title className="crucialDealsTitle">Crucial Deals</Card.Title>
                            <Card.Body className="crucialDealsBody">
                            {deal.sort(compareDeal).slice(0,5).map((d) => {
                                return (
                                <div className='dealRow'>
                                    <div>
                                        <div>{d.title}</div>
                                    </div> 
                                    <div>Etd return: {d.price}</div>                                   
                                    <AiFillDelete
                                        onClick={() => deleteItem(d.title)}
                                    />
                                </div>
                            ); 
                        })}
                                {/* <Card.Text className="crucialDeals">50 Crore</Card.Text>
                                <Card.Text className="crucialDeals">0.0</Card.Text>
                                <Card.Text className="crucialDeals">:(</Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
        // <div
        //     style={{
        //         backgroundColor: 'rgb(57, 57, 124)',
        //         backgroundRepeat: 'repeat',
        //         minHeight: '100vh',
        //     }}>
        //     <Toaster
        //         title='Login Successful'
        //         body='Congrats!'
        //         type='success'
        //         setShow={setShowToastS}
        //         show={showToastS}
        //     />
        //     <Toaster
        //         title='Login Fail'
        //         body='Check email and password'
        //         type='danger'
        //         setShow={setShowToastD}
        //         show={showToastD}
        //     />

        //     <Navbar class="navBar" bg="dark" variant="dark">
        //         <Container class="navContainer">
        //             <Navbar.Brand href="/home">
        //                 <img
        //                     alt=''
        //                     src='https://www.superoffice.co.uk/globalassets/home-com-website/resources/articles/visuals/what-is-crm/crm_top.jpg'
        //                     width='50'
        //                     height='30'
        //                     className='d-inline-block align-top'
        //                 />{' '}
        //                 Customer Management
        //             </Navbar.Brand>
        //             <span onClick={handleAnalyticsClick} className='analytics'>
        //                 Analytics
        //             </span>
        //             <span onClick={handleLogoutClick} className='logout'>
        //                 Logout
        //             </span>
        //         </Container>
        //     </Navbar>
        //     <div className="layout">
        //         <Card className="profileCard p-4" style={{ borderRadius: '0.5rem', minWidth: "15rem", minHeight: "35rem" }}>
        //             <Card.Title className="profileTitle">Profile Info</Card.Title>

        //             <div className='profileImage'>
        //                 <Card.Img src='https://freepngimg.com/download/facebook/62681-flat-icons-face-computer-design-avatar-icon.png' />
        //             </div>

        //             <Card.Body>
        //                 <Card.Text className='profileName'>
        //                     <div style={{ color: '#000000', fontSize: "medium" }}>
        //                         <b>Name:</b>
        //                         {user.name}
        //                     </div>
        //                 </Card.Text>
        //                 <Card.Text className='profileEmail'>
        //                     <div style={{ color: '#000000', fontSize: "medium" }}>
        //                         <b>Email:</b>
        //                         {user.email}
        //                     </div>
        //                 </Card.Text>
        //                 <Card.Text className='profileContact'>
        //                     <div style={{ color: '#000000', fontSize: "medium" }}>
        //                         <b>Phone:</b>
        //                         {user.phone}
        //                     </div>
        //                 </Card.Text>
        //             </Card.Body>
        //         </Card>
        //         <Card
        //             className='dealsCard p-4'
        //             style={{ borderRadius: '0.5rem', flex: "2" }}>
        //             <Card.Title className='dealsTitle'>Deals</Card.Title>
        //             <Card.Body className='dealsBody'>
        //                 <div className='dealRow'>
        //                     <div>Title</div>
        //                     <div>Partner</div>
        //                     <div>Description</div>
        //                 </div>
        //                 {deal.map((d) => {
        //                     return (
        //                         <div className='dealRow'>
        //                             <div>{d.title}</div>
        //                             {d.partner1 != user.name ? (
        //                                 <Link to={`/profile/${d.partner1}`}>
        //                                     {d.partner1}
        //                                 </Link>
        //                             ) : (
        //                                 <Link to={`/profile/${d.partner2}`}>
        //                                     {d.partner2}
        //                                 </Link>
        //                             )}
        //                             <div>{d.desc ? d.desc : ' '}</div>
        //                             <AiFillDelete
        //                                 onClick={() => deleteItem(d.title)}
        //                             />
        //                         </div>
        //                     );
        //                 })}
        //                 <Button
        //                     onClick={handleAddDeal}
        //                     style={{
        //                         marginLeft: '15rem',
        //                         textAlign: 'center',
        //                         marginTop: '0.5rem',
        //                     }}>
        //                     + Add
        //                 </Button>
        //                 {addDeal && (
        //                     <AddDeal
        //                         show={addDeal}
        //                         onHide={() => setAddDeal(false)}
        //                         name={user.name}
        //                         email={user.email}
        //                     />
        //                 )}
        //             </Card.Body>
        //         </Card>
        //         {/*<Card className="dealsCard p-4" style={{ borderRadius: '0.5rem',minWidth:"20rem",flex:'2',minHeight:"35rem" }}>
        //             <Card.Title className="dealsTitle">Deals</Card.Title>
        //             <Card.Body className="dealsBody">
        //                 <div className="dealRow"><div>Title</div><div>Partner</div><div>Description</div></div>
        //                 {deal.map((d) => { return (<div className="dealRow"><div>{d.title}</div>{(d.partner1 != user.name) ? <Link to={`/profile/${d.partner1}`}>{d.partner1}</Link> : <Link to={`/profile/${d.partner2}`}>{d.partner2}</Link>}<div>{d.desc ? d.desc : ' '}</div><AiFillDelete onClick={deleteItem(d.title)}/></div>) })}
        //                 <Button onClick={handleAddDeal} style={{ marginLeft: "15rem", textAlign: "center", marginTop: "0.5rem" }}>+ Add</Button>
        //                 {addDeal && <AddDeal show={addDeal} onHide={() => setAddDeal(false)} name={user.name} email={user.email} />}
        //             </Card.Body>
        //                 </Card>*/}
        //         <div className='rightbar'>
        //             <Container>
        //                 <Card className="notificationsCard p-4" style={{ borderRadius: '0.5rem', minWidth: "20rem", minHeight: "17.5rem" }}>
        //                     <Card.Title className="notificationTitle">Notifications</Card.Title>
        //                     <Card.Body className="notificationBody">

        //                         {notify && <Card.Text className="notification">New Deal Added</Card.Text>}
        //                     </Card.Body>
        //                 </Card>
        //             </Container>
        //             <Container>
        //                 <Card className="crucialDealsCard p-4" style={{ borderRadius: '0.5rem', minWidth: "15rem", minHeight: "17.5rem" }}>
        //                     <Card.Title className="crucialDealsTitle">Crucial Deals</Card.Title>
        //                     <Card.Body className="crucialDealsBody">

        //                         <Card.Text className="crucialDeals">50 Crore</Card.Text>
        //                         <Card.Text className="crucialDeals">0.0</Card.Text>
        //                         <Card.Text className="crucialDeals">:(</Card.Text>
        //                     </Card.Body>
        //                 </Card>
        //             </Container>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Home;
