import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container style={{alignItems:'center', paddingTop: "100px", paddingLeft:"200px"}}>
      <Row style={{align:'center', padding:'10px'}}>
        <Col xs={12} md={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer