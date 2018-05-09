import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home.js"
import KontaktNav from "./components/navbar/KontaktNav.js"
import NewKontakt from "./components/new/NewKontakt.js"
import EditKontakt from "./components/edit/EditKontakt.js"
import axios from 'axios';

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
                    <Route path="/kontakts/new" render={(props) => <NewKontakt/>} />
                    <Route path="/kontakts/:id/edit" render={(props) => <EditKontakt id={props.match.params.id}/> } />
                </div>
            </Router>
        )
    }
}



export default App;
