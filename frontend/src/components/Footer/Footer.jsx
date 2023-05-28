import React, { useContext,useState, useLayoutEffect } from 'react';
import { SidebarContext } from '../SidebarContext';
import { useDispatch, useSelector} from 'react-redux'
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import 'bootstrap/dist/css/bootstrap.css';
import {  emailA } from '../../actions/emailActions';
const quickLinks = [
  {
    path: "/",
    display: "Homepage",
  },

  {
    path: "/about",
    display: "About",
  },

  {
    path: "/competitors",
    display: "Compitator",
  },
  {
    path: "/store/products",
    display: "Products",
  },

  {
    path: "/store/vendors",
    display: "Vendors",
  },
];


const Footer = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const submitHandler = (e) => {
    e.preventDefault()
    if(userInfo){
      dispatch(emailA(email))
    }
    else{
      window.alert('Please Login First to subscribe Newsletter');
    }
  }
  const [isOpen, setIsOpen] = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  return (
    <footer className="footer" style={{ 
      overflowX: 'hidden'
  }}>
      <Container>
        <Row className='justify-content-center'>
          <Col lg="3" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-car-line"></i>
                  <span>
                  <img src={require('../../images/log.png')} width={250} height={80} alt='logo' />
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            At Hunting Era, we are committed to providing our users with the best possible experience..
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="4" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Wah Cantt, Pakistan</p>
              <p className="office__info">Phone: +92 3161508644</p>

              <p className="office__info">Email: producthunting5214@gmail.com</p>

              <p className="office__info">Office Time: 10am - 5pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      submitHandler(e);
                    }
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>This Website is for Educational Purpose.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
