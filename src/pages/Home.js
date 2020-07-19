import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container';
import SearchBar from '../components/searchComponents/SearchBar';

import { connect } from 'react-redux'
import { searchResults, changePage} from '../utils/actions/searchActions'

class HomePage extends Component{
    state = {
        disclaimer: "",
        terms: "",
        license: "",
        last_updated: ""
    }

    componentDidMount(){
        this.props.changePage(-this.props.pageNumber);
        axios.get("https://api.fda.gov/device/event.json")
            .then(res => {
                const {disclaimer, terms, license, last_updated} = res.data.meta;
                this.setState({disclaimer, terms, license, last_updated});
            })
    }

    searchFromSearchBar = () => {
        this.props.searchResults();
        this.props.history.push('/search')
    }

    render(){
        return (
            <Container>
                <p>{this.state.disclaimer}</p>
                <p>Terms: 
                    <a href={this.state.terms} target="_blank" rel="noopener noreferrer">{this.state.terms}</a> || License: 
                    <a href={this.state.license} target="_blank" rel="noopener noreferrer">{this.state.license}</a></p>

                <p>openFDA Endpoint Last Updated: {this.state.last_updated}</p>
                <SearchBar search={this.searchFromSearchBar}/>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    pageNumber: state.search.pageNumber
})

export default connect(mapStateToProps, {searchResults, changePage})(withRouter(HomePage))