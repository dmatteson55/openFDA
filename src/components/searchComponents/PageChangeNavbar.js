import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { changePage } from '../../utils/actions/searchActions'


const StyledButton = styled(Button)`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
`

const StyledContainer= styled(Container)`{
        display: flex;
        justify-content: center;
        align-items: center
}`

const PageNumber = styled.p`
    font-size: 1em;
    margin: 1em;
    background-color:
}
`

class PageChangeNavbar extends Component {

    changePage = (e) => {
        this.props.changePage(e.target.value);
        this.props.search();
        window.scrollTo(0,0);
    }
    
    render() {
        return (
            <StyledContainer>
                    <StyledButton 
                        value={-this.props.pageNumber} 
                        onClick={this.changePage} 
                        disabled={this.props.pageNumber === 0}
                        >First</StyledButton>
                    <StyledButton 
                        value="-1"
                        onClick={this.changePage} 
                        disabled={this.props.pageNumber === 0}
                        >Perv</StyledButton>
                    <PageNumber>Page: {this.props.pageNumber+1}</PageNumber>
                    <StyledButton 
                        value="1"
                        onClick={this.changePage} 
                        disabled={(this.props.pageNumber+1)*10 > this.props.resultCount}
                        >Next</StyledButton>
                    <StyledButton 
                        value={this.props.resultCount/10 - this.props.pageNumber}
                        onClick={this.changePage} 
                        disabled={(this.props.pageNumber+1)*10 > this.props.resultCount}
                        >Last</StyledButton>
                </StyledContainer>

        )
    }
}

const mapStateToProps = state => ({
    pageNumber: state.search.pageNumber
})

export default connect(mapStateToProps, {changePage})(PageChangeNavbar)