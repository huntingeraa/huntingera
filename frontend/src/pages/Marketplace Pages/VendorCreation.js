import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap'

const VendorCreation = () => {
  const history = useNavigate();

  const [disable, setDisable] = React.useState(true);

  const checkboxHandler = () => {
    setDisable(false)
  }
  const createVendorCreationHandler = () => {
    history(`/store/vendorcreation/vendoradd`)
  }

  return (
    <div className='othermain'>
    <Container>
      <Row className='align-items-center justify-content-end'>
        <Col>
          <h2>Terms of Services</h2>
          <p>This Terms of Services describes how Hunting Era(the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.

          We collect Device Information using the following expertise:

          <li>

          “Cookies” are data files that are located on your device or computer and often include an unspecified unique identifier. For more information about cookies, and how to inactivate cookies, visit http://www.allaboutcookies.org.
          </li>

          <li>

          Don't try to scam with anyone and don't provide falsify and illegal information which lead to account termination and legal steps.
          </li>

          <li>
           
          Don't try to scam with anyone and don't provide falsify and illegal information which lead to account termination and legal steps.
          </li>

          <li>
          Comply with law or with legal process. Try to protect against misuse or unauthorized use of Our Services; or protect the personal safety or property of our users or the public( who are using our websit)
          </li>
          </p>
          <div>
            <input type="checkbox" id="agree" onChange={checkboxHandler} />
            <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
          </div>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createVendorCreationHandler} disabled={disable}>
            <i className='fas fa-plus'></i> Create VendorCreation
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default VendorCreation
