import React from "react";
import { Col } from "reactstrap";
import "../../styles/services-list.css";
import serviceData from "../../images/serviceData";
import { RiServiceLine, RiStoreLine, RiBarChartLine, RiUserLocationLine, RiProductHuntLine , RiHome7Line } from "react-icons/ri";

const ServicesList = ({ }) => {
  return (
    <>
    {serviceData.map((item) => (
      <ServiceItem item={item} key={item.id} />
    ))}
  </>
  );
};

const ServiceItem = ({ item }) => {
  const Icon = getIconComponent(item.icon);

  return (
    <Col lg="4" md="4" sm="6" className="mb-3">
      <div className="service__item">
        <span className="mb-3 d-inline-block"  style={{ alignItems: "center" }}>
          <Icon size={60}/>
        </span>
        <h6 style={{ textAlign: "center", marginTop: "1rem" }}>{item.title}</h6>
        <p className="section__description" style={{ textAlign: "center", marginTop: "1rem" }}>{item.desc}</p>
      </div>
    </Col>
  );
};

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "ri-service-line":
      return RiServiceLine;
    case "ri-store-line":
      return RiStoreLine;
    case "ri-tools-fill":
      return RiBarChartLine;
    case "ri-timer-flash-line":
      return RiUserLocationLine;
    case "ri-map-pin-line":
      return RiProductHuntLine ;
    case "ri-home-7-line":
      return RiHome7Line;
    default:
      return null;
  }
};

export default ServicesList;
