import React from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const AddDeal = (props) => {
    const [input, setInput] = useState({
        title: '',
        desc: '',
        partner: '',
        priority: '',
        price:0
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
    const handleAddDeal = () => {
        const newDeal = {
            title: input.title,
            desc: input.desc,
            partner: input.partner,
            priority: input.priority,
            price: input.price
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
                                <option value="High">High</option>
                                <option value="Medium" defaultChecked>Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Estimated price</Form.Label>
                            <Form.Control onChange={handleChange} type="number" placeholder="Estimated Price" name="price" />
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