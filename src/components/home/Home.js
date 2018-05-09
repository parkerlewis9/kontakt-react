import React from 'react';
import { Table } from 'react-bootstrap';
import KontaktRow from "./KontaktRow.js"


const Home = ({kontakts}) => (
    <div className="container">
        <Table hover>
          <thead>
            <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Street Address</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
              {kontakts.map((kontakt) => {
                  return <KontaktRow key={kontakt.id} kontakt={kontakt}/>
              })}
          </tbody>
        </Table>
      </div>
)

export default Home;
