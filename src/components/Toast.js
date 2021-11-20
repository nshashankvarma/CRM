import React from 'react';
import {Toast, ToastContainer} from 'react-bootstrap'

function Toaster({type, setShow, show, title, body}) {
    return (
        <ToastContainer position="top-end" style={{ zIndex: 10 }}>
            <Toast onClose={() => setShow(false)} bg={type} show={show} delay={2000} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{body}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Toaster;