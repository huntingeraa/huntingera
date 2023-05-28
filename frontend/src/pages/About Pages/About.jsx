import React from "react";

import CommonSection from "../../components/UI/CommonSection";
import Helmet from "../../components/UI/Helmet";
import AboutSection from "../Home Pages/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomePartnerSection from "../../components/UI/BecomePartnerSection";

import img5 from "../../images/img5.jpg";
import "../../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <div className="about_style">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={img5} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Safe Purchasing Environment
                </h2>

                <p className="section__description">
                At Hunting Era, we are committed to providing our users with the best possible experience. Whether you are a consumer looking for the best deal on a product or a business looking to improve your online presence, Hunting Era has the tools and resources you need to succeed.
                </p>

                <p className="section__description">
                In addition to product comparisons, Hunting Era also offers a powerful keyword analysis tool that allows users to identify the most relevant and popular keywords for their products.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help? 24/7</h6>
                    <h4>+923161508644</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomePartnerSection />
      </div>
    </Helmet>
  );
};

export default About;
