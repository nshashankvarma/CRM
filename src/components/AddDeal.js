import React from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const AddDeal = (props) => {
    const [input, setInput] = useState({
        title: '',
        desc: '',
        partner: '',
        priority: ''
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
    const handleAddDeal = () => {
        const newDeal = {
            title: input.title,
            desc: input.desc,
            partner: input.partner,
            priority: input.priority
        }
        axios.post("http://localhost:3001/newdeal", {...newDeal, name:props.name, email:props.email})
        
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
                        Add New Deal:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Deal title" name="title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Descriptions" name="desc" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Partner</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Partner name" name="partner" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Priority</Form.Label>
                            <select onChange={handleChange} name="priority">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cancel</Button>
                    <Button onClick={handleAddDeal}>+ Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddDeal;