<div>
    <div>
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
                        {/* <div id="designation">profile.designation</div> */}
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
                            Mails
                        </div>
                        <div className='col border border-3 fs-4'>
                            Calls
                        </div>
                    </div>
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
    </div>
    {addAct && <AddAct show={addAct} onHide={() => setAddAct(false)} />}
    </div>