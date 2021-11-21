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
    const handleAddAct = async () => {
        
        console.log(input)
        var res = await axios.post("http://localhost:3001/newact", input)

        props.setActivities(res.data.activities)
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
                            <Form.Control onChange={handleChange} type="text" placeholder="name" name="name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Activity: </Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChange} name="activity" placeholder="Activity" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Description" name="desc" />
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