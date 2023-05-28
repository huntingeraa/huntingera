import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../images/img2.jpg";
import {
    FaCheckCircle
}from "react-icons/fa";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "-150px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
            <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Hunting Era</h2>
              <p className="section__desc">
              Hunting Era is a comprehensive website that helps users find the best deals on products, analyze keywords, and locate vendors. Our platform allows users to easily search for competitors of different products, giving them a better understanding of the market and helping them make more informed purchasing decisions.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__desc d-flex align-items-center gap-2">
                <FaCheckCircle/> Find Trendings
                </p>

                <p className="section__desc d-flex align-items-center gap-2">
                <FaCheckCircle/>Find Compitators
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__desc d-flex align-items-center gap-2">
                <FaCheckCircle/> Find Vendors&nbsp;&nbsp;&nbsp;&nbsp;
                </p>

                <p className="section__desc d-flex align-items-center gap-2">
                <FaCheckCircle/> Book Products
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
          <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
