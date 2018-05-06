import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

import { Table, Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kontakts: []
        };
    }
    componentDidMount() {
        axios.get(`https://kontakt-api.herokuapp.com/api/kontakts`)
        .then(res => {
            const posts = res;
            console.log(res);
            this.setState({ posts });
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Kontakt</Link>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            {/* <NavItem eventKey={1} href="#"> */}
                                {/* <Link to="/kontakts/new"><Button bsStyle="primary" bsSize="xsmall">+</Button></Link> */}
                            {/* </NavItem> */}
                        </Nav>
                    </Navbar>

                    <Route exact path="/" component={Home} />
                    <Route path="/kontakts/new" component={NewKontakt} />
                </div>
            </Router>
        )
    }
}


const Home = () => (
  <div className="container">
    <Table hover>
      <thead>
        <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Street Address</th>
            <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

const NewKontakt = () => (
  <div>
    <h2>About</h2>
  </div>
);

// export default App;
export default App;
