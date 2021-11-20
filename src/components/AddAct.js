import React from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const AddAct = (props) => {
    const [input, setInput] = useState({
        name: '',
        activity: '',
        desc: '',
    })
    const [deal, setDeal] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target
        setInput(pres => {
            return {
                ...pres,
                [name]: value
            }
        })
    }
    const handleAddAct = () => {
        const newAct = {
            name: input.name,
            desc: input.desc,
            activity: input.activity
        }
        axios.post("http://localhost:3001/newact", newAct)
        
        props.onHide()
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Activity:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="name" name="title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Activity: </Form.Label>
                            <Form.Control as="textarea" rows={3} name="text" placeholder="Activity" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Description" name="partner" />
                        </Form.Group>                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cancel</Button>
                    <Button onClick={handleAddAct}>+ Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddAct;