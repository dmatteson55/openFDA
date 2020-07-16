import React, { Component } from 'react'
import axios from 'axios'
import CardContainer from '../components/searchComponents/CardContainer';
import SearchBar from '../components/searchComponents/SearchBar';
import PageChangeNavbar from '../components/searchComponents/PageChangeNavbar';
import ErrorResponse from '../components/searchComponents/ErrorResponse';
import Container from 'react-bootstrap/Container';

export default class SearchPage extends Component {

    state = {
            results: [],
            searchTerm: 'BD',
            searchCondition: 'applicant',
            pageNumber: 0,
            resultCount: 0,
            limit:10,
            error: null
        };

    componentDidMount() {
        this.search(0)
    }

    searchFromSearchBar = () => {
        this.setState({pageNumber: 0});
        this.search(0);
    }

    search = (pageNumber) => {
        axios.get("https://api.fda.gov/device/510k.json", {
            params: {
                search : this.state.searchCondition+':'+this.state.searchTerm,
                limit : this.state.limit,
                skip: pageNumber*this.state.limit
            }
        }).then(res => {
            this.setState({resultCount : res.data.meta.results.total, results : res.data.results, error: null});
        }).catch(err => {
            this.setState({resultCount: 0, error: err})
        })
    }

    resultsShown = () => {
        const total = this.state.limit*(this.state.pageNumber+1);
        return total - this.state.limit + " - " + (this.state.resultCount > total ? + total : this.state.resultCount);
    }

    changePage = (pageChange) => {
        const newPageNumber = this.state.pageNumber + parseInt(pageChange)
        this.setState({pageNumber: newPageNumber});
        this.search(newPageNumber);
    }

    render() {
        return (
        <Container>
            <SearchBar 
                search={this.searchFromSearchBar}
                setCondition={(searchCondition) => {this.setState({searchCondition})}}
                setTerm={(searchTerm) => {this.setState({searchTerm})}}
                searchCondition = {this.state.searchCondition}
            />

            {(this.state.error) ? 
                <ErrorResponse
                    error={this.state.error} 
                    searchCondition={this.state.searchCondition}
                    searchTerm={this.state.searchTerm}        
                /> : null }

            {(this.state.resultCount === 0) ?  null : 
            <React.Fragment>
                <h4>Results: {this.resultsShown()} out of {this.state.resultCount}</h4>
                <CardContainer results={this.state.results}/>
                <PageChangeNavbar 
                    changePage = {this.changePage} 
                    pageNumber = {this.state.pageNumber}
                    resultCount = {this.state.resultCount}
                />
            </React.Fragment>}
        </Container>
        )
    }
}
