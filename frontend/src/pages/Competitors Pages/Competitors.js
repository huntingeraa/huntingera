import React from 'react';
import background from '../../images/img4.jpg'
import Search from '../../components/CompitatorSearch'
import '../../styles/Image.css'
import { Container, Row, Col } from "reactstrap";
import ServicesList from './ServicesList'; 

const Competitors = () => {
    return (
        <>
        <div className="image-container" style={{
            backgroundImage: `url(${background})`,
            margin: -20, height: "577px", backgroundRepeat: "no-repeat", backgroundSize: "cover" 
          }}>
            <h1 style={{textAlign: 'center',paddingTop: "100px", color: "#FFFFFF", fontSize:"50px"}}>View Your Product Competitors</h1>
            <div className="search-container" style={{alignItems: 'center',paddingTop: "100px"}} ><Search/></div>
          
          </div>
          <section>
        <Container >
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
            
          </Row>
        </Container>
      </section>
          </>
    );
};

export default Competitors;