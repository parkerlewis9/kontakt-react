import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

import {Table, Navbar,
        Nav, Button,
        FormGroup, ControlLabel,
        FormControl
        } from 'react-bootstrap';

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
            const kontakts = res.data;
            console.log(kontakts);
            this.setState({ kontakts });
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <KontaktNav/>
                    <Route exact path="/" render={() => <Home kontakts={this.state.kontakts}/>} />
                    <Route path="/kontakts/new" component={NewKontakt} />
                    <Route path="/kontakts/:id/edit" render={(props) => <EditKontakt id={props.match.params.id}/>} />
                </div>
            </Router>
        )
    }
}

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const FormInstance = ({kontakt}) => {
    return (
      <form>
        <FieldGroup
          id="formControlsName"
          value={`${kontakt.name}`}
          type="text"
          label="Name"
          placeholder=""
        />
        <FieldGroup
          id="formControlsPhone"
          value={`${kontakt.phoneNumber}`}
          type="text"
          label="Phone Number"
          placeholder=""
        />
        <FieldGroup
          id="formControlsEmail"
          value={`${kontakt.emailAddress}`}
          type="email"
          label="Email address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineOne"
          value={`${kontakt.addressLineOne}`}
          type="text"
          label="Address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineTwo"
          value={`${kontakt.addressLineTwo}`}
          type="text"
          label="Address (cont'd)"
          placeholder=""
        />
        <FieldGroup
          id="formControlsState"
          value={`${kontakt.state}`}
          type="text"
          label="State"
          placeholder=""
        />
        <FieldGroup
          id="formControlsCountry"
          value={`${kontakt.country}`}
          type="text"
          label="Country"
          placeholder=""
        />
        <FieldGroup
          id="formControlsZipcode"
          value={`${kontakt.zipcode}`}
          type="text"
          label="Zipcode"
          placeholder=""
        />

        <Button onClick={(e) => {e.preventDefault();console.log("clicked")}} type="submit">Submit</Button>

        <br/>
        <br/>
      </form>
    );

}

class EditKontakt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            kontakt: {  name: "",
                        phoneNumber: "",
                        emailAddress: "",
                        addressLineOne: "",
                        addressLineTwo: "",
                        state: "",
                        country: "",
                        zipcode: ""
                    }
        }
    }
    componentDidMount() {
        const id = this.state.id
        axios.get(`https://kontakt-api.herokuapp.com/api/kontakts/${id}`)
        .then(res => {
            const kontakt = res.data;
            this.setState({ kontakt });
        });
    }
    render() {
        return (<div className="container">
            <h1>Edit Your Kontakt</h1>
            <FormInstance kontakt={this.state.kontakt}/>
        </div>)
    }
}

const NewKontakt = () => (
    <div className="container">
    <h1>Add a New Kontakt</h1>
    <FormInstance kontakt={{name: "",
                            phoneNumber: "",
                            emailAddress: "",
                            addressLineOne: "",
                            addressLineTwo: "",
                            state: "",
                            country: "",
                            zipcode: ""}}/>
    </div>
)

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



export default App;
