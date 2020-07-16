import React, { Component } from 'react'
import ResultCard from './ResultCard';

export default class CardContainer extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.results.map((result) => {
                return <ResultCard key={result.k_number} result={result} /> }
                )}
            </React.Fragment>
        )
    }
}
