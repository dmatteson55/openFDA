import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'


const StyledButton = styled(Button)`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
`

export default class PageChangeNavbar extends Component {

    changePage = (e) => {
        this.props.changePage(e.target.value);
        window.scrollTo(0,0);
    }
    
    render() {
        return (
            <Container>
                    <StyledButton value="-1" onClick={this.changePage} disabled={this.props.pageNumber === 0}>Perv</StyledButton>
                    <StyledButton value="1" onClick={this.changePage} disabled={(this.props.pageNumber+1)*10 > this.props.resultCount}>Next</StyledButton>
            </Container>
        )
    }
}