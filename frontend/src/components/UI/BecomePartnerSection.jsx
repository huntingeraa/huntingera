import React from "react";
import "../../styles/become-partner.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';



import partnerImg from "../../images/img6.png";

const BecomePartnerSection = () => {
  return (
    <section className="become__partner" style={{background: 'linear-gradient(#a00202, hwb(235 0% 95% / 0.9))'}}>
      <Container >
        <Row>
          <Col lg="6" md="6" sm="12" className="become__partner-img">
            <img src={partnerImg} alt="" className="w-100" />
          </Col>
          <Col lg="6" md="6" sm="12" >
          <br/><br/><br/>
            <h2 className="section__title become__partner-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>
            <Link to={'/'}>
            <button className="btn become__partner-btn mt-4">
              Become Dropshipper
            </button>
             </Link>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Link to={'/'}>
            
            <button className="btn become__partner-btn mt-4">
              Become Vendor
            </button>
            </Link>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomePartnerSection;
