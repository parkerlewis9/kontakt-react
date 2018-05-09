import React, { Component } from 'react';
import FormInstance from "../forms/FormInstance.js"
import axios from 'axios';

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
            <FormInstance isEditForm={true}
                          kontakt={this.state.kontakt}
                          onSubmit={this.updateKontakt}
                          handleTyping={this.handleTyping}
                          deleteKontakt={this.deleteKontakt}/>
        </div>)
    }
}

export default EditKontakt;
