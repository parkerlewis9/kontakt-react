import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

import { Table, Navbar, Nav, Button } from 'react-bootstrap';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <KontaktNav/>

                    <Route exact path="/" component={Home} />
                    <Route path="/kontakts/new" component={NewKontakt} />
                    <Route path="/kontakts/:id/edit" component={NewKontakt} />
                </div>
            </Router>
        )
    }
}

const KontaktNav = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Kontakt</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <Navbar.Text>
                <Link to="/kontakts/new"><Button bsStyle="primary" bsSize="xsmall">+</Button></Link>
            </Navbar.Text>
        </Nav>
    </Navbar>
)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kontakts: []
        };
    }
    componentDidMount() {
        axios.get(`https://kontakt-api.herokuapp.com/api/kontakts`)
        .then(res => {
            const kontakts = res.data;
            console.log(kontakts);
            this.setState({ kontakts });
        });
    }
    render() {
        return (
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
                      {this.state.kontakts.map((kontakt) => {
                          return <KontaktRow key={kontakt.id} kontakt={kontakt}/>
                      })}
                  </tbody>
                </Table>
  </div>
        )
    }
}

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


const NewKontakt = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default App;
