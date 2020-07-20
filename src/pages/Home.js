import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from '../components/searchComponents/SearchBar';
import styled from 'styled-components'

import { connect } from 'react-redux'
import { searchResults, changePage} from '../utils/actions/searchActions'


const StyledContainer= styled(Container)`{
    .row{
        boarder: 1px solid lightgrey;
        padding: 5px;
        margin: 5px 0;
        text-align: center;
    }
    .col{
        padding 5px;
    }
`;

const Link = styled.a`
    color: black;
`


//HomePage Component, presents information about openFDA 
class HomePage extends Component{
    state = {
        disclaimer: "",
        terms: "",
        license: "",
        last_updated: ""
    }

    //initial API request for openFDA updated infromation
    componentDidMount(){
        this.props.changePage(-this.props.pageNumber);
        axios.get("https://api.fda.gov/device/510k.json")
            .then(res => {
                const {disclaimer, terms, license, last_updated} = res.data.meta;
                this.setState({disclaimer, terms, license, last_updated});
            })
    }

    //prop for searchbar componenet (used router to push to SearchPage)
    searchFromSearchBar = () => {
        this.props.searchResults();
        this.props.history.push('/search')
    }

    render(){
        return (
            <StyledContainer>
                <Row>{this.state.disclaimer}</Row>
                <Row>
                    <Col>Terms: <Link href={this.state.terms} target="_blank" rel="noopener noreferrer">{this.state.terms}</Link></Col>
                    <Col>License: <Link href={this.state.license} target="_blank" rel="noopener noreferrer">{this.state.license}</Link></Col>
                </Row>
                <Row> <Col>openFDA Endpoint Last Updated: {this.state.last_updated}</Col></Row>
                <SearchBar search={this.searchFromSearchBar}/>
            </StyledContainer>
        )
    }
}

const mapStateToProps = state => ({
    pageNumber: state.search.pageNumber
})

export default connect(mapStateToProps, {searchResults, changePage})(withRouter(HomePage))