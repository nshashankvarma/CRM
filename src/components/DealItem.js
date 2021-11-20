import React from 'react';
import {Link} from 'react-router-dom'

const DealItem = (props) => {
    return (
                <tr style={{border:"2px solid #000000", marginTop:"2rem", width:"100%"}}>
                <td><h5 style={{display:"inline", marginRight:"5rem"}}>{props.title}</h5></td>
                <td><h5 style={{display:"inline", marginRight:"5rem"}}>{(props.partner1 != props.name) ? <Link to={`/profile/${props.partner1}`}>{props.partner1}</Link> : <Link to={`/profile/${props.partner2}`}>{props.partner2}</Link>}</h5></td>
                <td><h6 style={{display:"inline"}}>{props.desc}</h6></td>
                </tr>
    );
};

export default DealItem;