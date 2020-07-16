import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'
import px2vw from "../../utils/px2vw"

const Styles = styled.div`
    .InputGroup{
        font-size: ${px2vw(30)};
        @media (min-width: 768px) {
            font-size: ${px2vw(24)};
        }
        @media (min-width: 1024px) {
            font-size: ${px2vw(16)};
        }
}
`
export default class SearchBar extends Component {
    state =  {
        searchCondition: "applicant",
        searchTerm: ""
    };

    setSearch = (event) => {
        this.props.search();
        event.preventDefault();
      }    

    render() {
        return (
            <Styles>
                <form noValidate autoComplete="off" onSubmit={this.setSearch}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Search By:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.props.searchCondition}
                            onSelect={(e) => {this.props.setCondition(e)}}
                        >
                            <Dropdown.Item eventKey="applicant">Applicant</Dropdown.Item>
                            <Dropdown.Item eventKey='device_name'>Device Name</Dropdown.Item>
                            <Dropdown.Item eventKey="advisory_committee">Advisory Committee</Dropdown.Item>
                            <Dropdown.Item eventKey="openfda.device_class">Device Class</Dropdown.Item>
                            <Dropdown.Item eventKey="product_code">Product Code</Dropdown.Item>
                            <Dropdown.Item eventKey="decision_code">Decision Code</Dropdown.Item>
                        </DropdownButton>
                        <FormControl 
                            aria-describedby="basic-addon1" 
                            defaultValue={this.state.searchTerm}
                            onChange={(e) => {this.props.setTerm(e.target.value)}}
                        />
                    </InputGroup>
                </form>
            </Styles>
                

        )
    }
}
