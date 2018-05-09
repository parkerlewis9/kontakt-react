import React, { Component } from 'react';
import FormInstance from "../forms/FormInstance.js"
import axios from 'axios';

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
                                zipcode: ""}}
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
        return (
            <div className="container">
            <h1>Add a New Kontakt</h1>
            <FormInstance kontakt={this.state.kontakt}
                          isEditForm={false}
                          onSubmit={this.createNewKontakt}
                          handleTyping={this.handleTyping}/>
            </div>
        )
    }
}

export default NewKontakt;
