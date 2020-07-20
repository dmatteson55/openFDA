import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import px2vw from "../../utils/px2vw"

const Styles = styled.div`
.card{
    boarder: 1px solid lightgrey;
    padding: 10px;
    background-color:aliceblue;
    margin: 5px 0;
    text-align: center;
}
.card-body{
    font-size: ${px2vw(30)};
    @media (min-width: 768px) {
        font-size: ${px2vw(24)};
    }
    @media (min-width: 1024px) {
        font-size: ${px2vw(16)};
    }
}
.col{
    padding 5px;
}
`;

//ResultCard component displays singular result passed as prop
export default class ResultCard extends Component {
    render() {
        return (
            <Styles>
                <Card>
                    <Card.Title>{this.props.result.applicant}</Card.Title>
                    <Card.Subtitle>Device Name: {this.props.result.device_name}</Card.Subtitle>
                    <Card.Body>
                        <Container fluid="md">
                            <Row>
                                <Col>Description: {this.props.result.openfda.device_name}</Col>                            
                                <Col>Class: {this.props.result.openfda.device_class}</Col>
                            </Row>
                            <Row> 
                                <Col>Medical Speciality: {this.props.result.openfda.medical_specialty_description}</Col>
                                <Col>Product Code: {this.props.result.product_code}</Col>
                            </Row>
                            <Row>
                                <Col>Submission Date: {this.props.result.date_received}</Col>
                                <Col>Decision Date: {this.props.result.decision_date}</Col>
                            </Row>
                        </Container>
                    </Card.Body>
                    <Card.Footer>Decision: {this.props.result.decision_description}</Card.Footer>
                </Card>
            </Styles>
        )
    }
}
