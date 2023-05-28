import React, {useRef} from 'react'
import { Container, Row, Col} from "reactstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/adminActions'
import '../../styles/header.css'
import { RiUserFill } from 'react-icons/ri';

export const Navbar = () => {
    const dispatch = useDispatch();

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin
  
    const logoutHandler = () => {
      dispatch(logout())
    }
    const menuRef = useRef(null);
  
    const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  
    return (
      <header className="header">
        {/* ============ header top ============ */}
        <div className="header__top1">
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6">
                <div className="header__top__left">
                <LinkContainer to='/'>
                  <span1>HUNTING ERA ADMIN PANEL</span1>
                  </LinkContainer>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <RiUserFill size={22} color="#050505" />
              {adminInfo ? (
                  <NavDropdown
                    title={adminInfo.name}
                    id='adminname'
                  >
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                      
                <Link to="/admin" className=" d-flex align-items-center gap-1">
                    
                  </Link>
              
                  )}
                
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </header>
    )
}
export default Navbar