import React, { Component } from 'react'
import { connect } from 'react-redux'

class ErrorResponse extends Component {
    reportError = (errorStatus) => {
        if (errorStatus === 400 || errorStatus === 404){
            return <React.Fragment>
                        <h5>Results for your request: "{this.props.searchCondition}:{this.props.searchTerm}" were not found.</h5>
                        <p>Suggestions:</p>
                        <ul>
                            <li>Make sure all words are spelled correctly.</li>
                            <li>Try more general keywords.</li>
                            <li>Try fewer keywords.</li>
                            <li>Check openFDA general documentation: 
                                <a 
                                    href="https://open.fda.gov/apis/device/510k/" 
                                    target="_blank"
                                    rel="noopener noreferrer"    
                                > https://open.fda.gov/apis/device/510k/</a>
                            </li>
                            <li>Check openFDA documenation on your search field, "{this.props.searchCondition}": 
                                <a 
                                    href="https://open.fda.gov/apis/drug/event/searchable-fields" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                > https://open.fda.gov/apis/drug/event/searchable-fields</a>
                            </li>
                        </ul>
                    </React.Fragment>
        } else {
            return <React.Fragment>
                <h5>An unforseen error occured</h5>
                <p>Suggestions: </p>
                <ul>
                    <li>Reload the page with a different request.</li>
                    <li>Check openFDA general documentation: 
                                <a 
                                    href="https://open.fda.gov/apis/device/510k/" 
                                    target="_blank"
                                    rel="noopener noreferrer"    
                                > https://open.fda.gov/apis/device/510k/</a>
                    </li>
                    <li>You may have exceeded openFDAs request limit (1000/day)</li>
                </ul>


            </React.Fragment>
        }
    }

    render() {
        return (
            <React.Fragment>
                {(this.props.error.response) ? 
                    this.reportError(this.props.error.response.status)
                : this.reportError(1)}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    searchTerm: state.search.searchTerm,
    searchCondition: state.search.searchCondition
})

export default connect(mapStateToProps, null)(ErrorResponse)