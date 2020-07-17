import React, {Component} from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container';
import SearchBar from '../components/searchComponents/SearchBar';

export default class HomePage extends Component{
    state = {
        disclaimer: "",
        terms: "",
        license: "",
        last_updated: ""
    }

    componentDidMount(){
        axios.get("https://api.fda.gov/device/event.json")
            .then(res => {
                const {disclaimer, terms, license, last_updated} = res.data.meta;
                this.setState({disclaimer, terms, license, last_updated});
            })
    }

    render(){
        return (
            <Container>
                <p>{this.state.disclaimer}</p>
                <p>Terms: <a href={this.state.terms} target="_blank" rel="noopener noreferrer">{this.state.terms}</a> 
                || License: <a href={this.state.license} target="_blank" rel="noopener noreferrer">{this.state.license}</a></p>

                <p>openFDA Endpoint Last Updated: {this.state.last_updated}</p>
                    <SearchBar      />
            </Container>
        )
    }
}