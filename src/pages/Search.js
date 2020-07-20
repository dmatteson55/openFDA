import React, { Component } from 'react'
import CardContainer from '../components/searchComponents/CardContainer';
import SearchBar from '../components/searchComponents/SearchBar';
import PageChangeNavbar from '../components/searchComponents/PageChangeNavbar';
import ErrorResponse from '../components/searchComponents/ErrorResponse';
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux'
import { searchResults, changePage } from '../utils/actions/searchActions'


//SearchPage Componenet, 
class SearchPage extends Component {
    limit = 10;

    componentDidMount() {
        this.props.searchResults();
    }

    ////prop for searchbar componenet (resets pageNumber to 0, scrolls to top of page)
    searchFromSearchBar = () => {
        this.props.changePage(-this.props.pageNumber);
        this.props.searchResults();
        window.scrollTo(0,0);
    }

    resultsShown = () => {
        const total = this.limit*(this.props.pageNumber+1);
        return total - this.limit + " - " + (this.props.resultCount > total ? + total : this.props.resultCount);
    }

    render() {
        return (
        <Container>
            <SearchBar search={this.searchFromSearchBar}/>

            {(this.props.error) ?
                <ErrorResponse
                    error={this.props.error}
                /> : null }

            {(this.props.resultCount === 0) ?  null :
            <React.Fragment>
                <h4>Results: {this.resultsShown()} out of {this.props.resultCount}</h4>
                <CardContainer results={this.props.results}/>
                <PageChangeNavbar
                    resultCount = {this.props.resultCount}
                    search = {this.props.searchResults}
                />
            </React.Fragment>}
        </Container>
        )
    }
}


const mapStateToProps = state => ({
    results: state.search.results,
    resultCount: state.search.resultCount,
    error: state.search.error,
    searchTerm: state.search.searchTerm,
    searchCondition: state.search.searchCondition,
    pageNumber: state.search.pageNumber
})


export default connect(mapStateToProps, { searchResults, changePage})(SearchPage)