import React from 'react';
import { Link } from "react-router-dom";

import { Button } from 'react-bootstrap';

const KontaktRow = ({kontakt}) => {
    return (
        <tr>
            <td>{kontakt.name}</td>
            <td>{kontakt.phoneNumber}</td>
            <td>{kontakt.emailAddress}</td>
            <td>{`${kontakt.addressLineOne}, ${kontakt.addressLineTwo}, ${kontakt.state}, ${kontakt.country}, ${kontakt.zipcode}`}</td>
            <td><Link to={`kontakts/${kontakt.id}/edit`}><Button bsStyle="default" bsSize="small">Edit</Button></Link></td>
        </tr>
    )
}

export default KontaktRow
