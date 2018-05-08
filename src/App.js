import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
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
            this.setState({ kontakts });
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <KontaktNav/>
                    <Route exact path="/" render={() => <Home kontakts={this.state.kontakts}/>} />
                    <Route path="/kontakts/new" render={(props) => <NewKontakt history={props.history} />} />
                    <Route path="/kontakts/:id/edit" render={(props) => <EditKontakt id={props.match.params.id}/> } />
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

const FormInstance = ({kontakt, onSubmit, handleTyping, fireRedirect, history, isEditForm, deleteKontakt}) => {
    return (
      <form onSubmit={(e) => {e.preventDefault(); onSubmit({ name: e.target[0].value,
                                                             phoneNumber: e.target[1].value,
                                                             emailAddress: e.target[2].value,
                                                             addressLineOne: e.target[3].value,
                                                             addressLineTwo: e.target[4].value,
                                                             state: e.target[5].value,
                                                             country: e.target[6].value,
                                                             zipcode: e.target[7].value,

                                                            })}}>
        <FieldGroup
          id="formControlsName"
          value={`${kontakt.name}`}
          onChange={(e) => {handleTyping(e.target.value, "name")}}
          type="text"
          label="Name"
          placeholder=""
        />
        <FieldGroup
          id="formControlsPhone"
          value={`${kontakt.phoneNumber}`}
          onChange={(e) => {handleTyping(e.target.value, "phoneNumber")}}
          type="text"
          label="Phone Number"
          placeholder=""
        />
        <FieldGroup
          id="formControlsEmail"
          value={`${kontakt.emailAddress}`}
          onChange={(e) => {handleTyping(e.target.value, "emailAddress")}}
          type="email"
          label="Email address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineOne"
          value={`${kontakt.addressLineOne}`}
          onChange={(e) => {handleTyping(e.target.value, "addressLineOne")}}
          type="text"
          label="Address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineTwo"
          value={`${kontakt.addressLineTwo}`}
          onChange={(e) => {handleTyping(e.target.value, "addressLineTwo")}}
          type="text"
          label="City"
          placeholder=""
        />
        <FieldGroup
          id="formControlsState"
          value={`${kontakt.state}`}
          onChange={(e) => {handleTyping(e.target.value, "state")}}
          type="text"
          label="State"
          placeholder=""
        />
        <FieldGroup
          id="formControlsCountry"
          value={`${kontakt.country}`}
          onChange={(e) => {handleTyping(e.target.value, "country")}}
          type="text"
          label="Country"
          placeholder=""
        />
        <FieldGroup
          id="formControlsZipcode"
          value={`${kontakt.zipcode}`}
          onChange={(e) => {handleTyping(e.target.value, "zipcode")}}
          type="text"
          label="Zipcode"
          placeholder=""
        />

        <Button type="submit">Submit</Button>

        <br/>
        <br/>

        {isEditForm ? <Button bsStyle="danger" onClick={() => deleteKontakt()}>Delete</Button> : <br/>}

        <br/>
        <br/>
      </form>
    );

}

class EditKontakt extends Component {
    constructor(props) {
        console.log(props);
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
                    },
            history: props.history
        }
        this.updateKontakt = this._updateKontakt.bind(this)
        this.handleTyping = this._handleTyping.bind(this)
        this.deleteKontakt = this._deleteKontakt.bind(this)
    }
    componentDidMount() {
        const id = this.state.id
        axios.get(`https://kontakt-api.herokuapp.com/api/kontakts/${id}`)
        .then(res => {
            const kontakt = res.data;
            this.setState({ kontakt });
        });
    }

    _updateKontakt(kontakt) {
        kontakt["id"] = this.state.id
        axios.put(`https://kontakt-api.herokuapp.com/api/kontakts/${this.state.id}`, kontakt)
        .then(res => {
            window.location.assign("/")
        });
    }

    _deleteKontakt() {
        axios.delete(`https://kontakt-api.herokuapp.com/api/kontakts/${this.state.id}`)
        .then(res => {
            window.location.assign("/")
        });
    }

    _handleTyping(value, field) {
        let newState = {kontakt: {...this.state.kontakt} }
        newState.kontakt[field] = value;
        this.setState(newState)
    }

    render() {
        return (<div className="container">
            <h1>Edit Your Kontakt</h1>
            <FormInstance history={this.state.history}
                          isEditForm={true}
                          kontakt={this.state.kontakt}
                          onSubmit={this.updateKontakt}
                          handleTyping={this.handleTyping}
                          deleteKontakt={this.deleteKontakt}/>
        </div>)
    }
}

class NewKontakt extends Component {
    constructor(props) {
        super(props)
        this.state = {kontakt: {name: "",
                                phoneNumber: "",
                                emailAddress: "",
                                addressLineOne: "",
                                addressLineTwo: "",
                                state: "",
                                country: "",
                                zipcode: ""},
                      fireRedirect: false,
                      history: props.history}
        this.createNewKontakt = this._createNewKontakt.bind(this)
        this.handleTyping = this._handleTyping.bind(this)
    }

    _createNewKontakt(kontakt) {
        axios.post(`https://kontakt-api.herokuapp.com/api/kontakts`, kontakt)
        .then(res => {
            window.location.assign("/")
        });
    }

    _handleTyping(value, field) {
        let newState = {kontakt: {...this.state.kontakt} }
        newState.kontakt[field] = value;
        this.setState(newState)
    }

    render() {
        console.log(this.state.history);
        return (
            <div className="container">
            <h1>Add a New Kontakt</h1>
            <FormInstance kontakt={this.state.kontakt}
                          isEditForm={false}
                          onSubmit={this.createNewKontakt}
                          handleTyping={this.handleTyping}
                          fireRedirect={this.state.fireRedirect}
                          history={this.state.history}/>
            </div>
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
