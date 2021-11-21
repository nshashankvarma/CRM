import React, { useEffect, useState } from 'react';
import { Container, Navbar, Card, Table } from 'react-bootstrap';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import AddAct from './AddAct';
import background from "./tile_background.jpeg";


const Profile = () => {
    const { name } = useParams();
    const [user, setUser] = useState();
    const [profile, setProfile] = useState({});
    const [addAct, setAddAct] = useState(false);
    const [activities, setActivities] = useState([]);
    const history = useNavigate();
    const handleNewAct = () => {
        setAddAct(true);
    };
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3001/profile/${name}`)
                .then((res) => {
                    return res.json();
                })
                .then((userdata) => {
                    if (userdata.docs) {
                        setProfile(userdata.docs);
                    } else {
                        console.log('No User Found');
                        history('/home');
                    }
                })
                .catch((error) => console.log(error));
        }, 500);

        setTimeout(() => {
            fetch('http://localhost:3001/activity')
                .then((res) => {
                    return res.json();
                })
                .then((userdata) => {
                    setActivities(userdata.docs.activities);
                    // console.log(userdata.docs.activities);
                })
                .catch((err) => {
                    console.log('No Activity');
                });
        }, 1000);
    }, [name]);

    return (
        <div>
            {/* <div>
                <div className='row'>
                    <div className='column col-3'>
                        <div className='row'>
                            <div className='col-4 ms-4'>
                                <img src='' alt='' id='profile' />
                            </div>
                            <div className='col-7'>
                                <div id='name' className='mt-5'>
                                    {profile?.name}
                                </div>
                                <div id="designation">profile.designation</div>
                            </div>
                            <hr />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div className='col-title ms-3'>About: </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div
                                className='fs-5'
                                style={{
                                    textDecoration: 'underline',
                                    marginLeft: '1rem',
                                    marginTop: '0.8rem',
                                    display: 'inline',
                                    color: 'grey',
                                }}>
                                Email:{' '}
                            </div>
                            <br />
                            <div id='email'>{profile?.email}</div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div
                                className='fs-5'
                                style={{
                                    textDecoration: 'underline',
                                    marginLeft: '1rem',
                                    marginTop: '0.8rem',
                                    display: 'inlineBlock',
                                    color: 'grey',
                                }}>
                                Phone No:{' '}
                            </div>
                            <br />
                            <div id='phone'>+91 9538655010</div>
                        </div>
                    </div>
                    <div className='col-6 column'>
                        <div className='col-title'>All Activity: </div>
                        <div className='row ms-3'>
                            <div className='row text-center'>
                                <div className='col border border-3 fs-4'>
                                    Activity
                                </div>
                                <div className='col border border-3 fs-4'>
                                    Name
                                </div>
                                <div className='col border border-3 fs-4'>
                                    Description
                                </div>
                            </div>
                            {activities.map((act) => (
                                <div className='row text-center'>
                                    <div className='col border border-3 fs-4'>
                                        {act.activity}
                                    </div>
                                    <div className='col border border-3 fs-4'>
                                        {act.name}
                                    </div>
                                    <div className='col border border-3 fs-4'>
                                        {act.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleNewAct}>+ Add</Button>
                    </div>

                    <div className='col-3 column'>
                        <div className='row' style={{ height: '40%' }}>
                            <div className='col-title'>All Deals: </div>
                            List of deals coming up...
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-title'>Tasks : </div>
                            <ul>
                                <li>1. Call Bheema</li>
                                <li>2. Set up a meeting with Nakul</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}

            <div style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "repeat",
                minHeight: "100vh"
            }}>
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
                        {/*<span onClick={handleLogoutClick} className="logout">Logout</span>*/}
                    </Container>
                </Navbar>
                <div className="layout">
                    <Card className="profileCard p-4" style={{ borderRadius: '0.5rem', minWidth: "20rem", flex: '2', minHeight: "35rem" }}>
                        <Card.Title className="profileTitle"><div style={{ color: '#b68973' }}>About</div></Card.Title>

                        <div className="profileImage">
                            <Card.Img src="https://freepngimg.com/download/facebook/62681-flat-icons-face-computer-design-avatar-icon.png" />
                        </div>

                        <Card.Body>

                            <Card.Text className="profileName"><div style={{ color: '#000000' }}><b>Name:</b>{/*{user.name}*/}</div></Card.Text>
                            <Card.Text className="profileEmail"><div style={{ color: '#000000' }}><b>Email:</b>{/*{user.email}*/}</div></Card.Text>
                            <Card.Text className="profileContact"><div style={{ color: '#000000' }}><b>Phone:</b>{/*{user.phone}*/}</div></Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="activityCard p-4" style={{ borderRadius: '0.5rem', minWidth: "20rem", flex: '2', minHeight: "35rem" }}>
                        <Card.Title className="activityTitle"><b>All Activities</b></Card.Title>
                        <Card.Body className="activityBody">
                            <div className="activityRow"><div>Activity</div><div>Mails</div><div>Call</div></div>
                            {/*{deal.map((d) => { return (<div className="dealRow"><div>{d.title}</div>{(d.partner1 != user.name) ? <Link to={`/profile/${d.partner1}`}>{d.partner1}</Link> : <Link to={`/profile/${d.partner2}`}>{d.partner2}</Link>}<div>{d.desc ? d.desc : ' '}</div><AiFillDelete onClick={deleteItem(d.title)}/></div>) })}
                            <Button onClick={handleAddDeal} style={{ marginLeft: "15rem", textAlign: "center", marginTop: "0.5rem" }}>+ Add</Button>
        {addDeal && <AddDeal show={addDeal} onHide={() => setAddDeal(false)} name={user.name} email={user.email} />}*/}
                            <div>Called</div><div>Mailed</div><div>Called once more</div>
                        </Card.Body>
                    </Card>
                    <div className="rightbar">

                        <Container>
                            <Card className="allDealsCard p-4" style={{ borderRadius: '0.5rem', minWidth: "30rem", minHeight: "17.5rem", flex: '2' }}>
                                <Card.Title className="allDealsTitle">All Deals</Card.Title>
                                <Card.Body className="allDealsBody">

                                    {/* {notify && <Card.Text className="allDeals">New Deal Added</Card.Text>}*/}
                                </Card.Body>
                            </Card>
                        </Container>
                        <Container>
                            <Card className="tasksCard p-4" style={{ borderRadius: '0.5rem', minWidth: "30rem", minHeight: "17.5rem", flex: '2' }}>
                                <Card.Title className="tasksTitle">Tasks</Card.Title>
                                <Card.Body className="tasksBody">

                                    <Card.Text className="tasks">50 Crore</Card.Text>
                                    <Card.Text className="tasks">0.0</Card.Text>
                                    <Card.Text className="tasks">:(</Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                </div>
            </div>
            {addAct && (
                <AddAct
                    show={addAct}
                    onHide={() => setAddAct(false)}
                    setActivities={setActivities}
                />
            )}
        </div>
    );
                        
            }

export default Profile;
