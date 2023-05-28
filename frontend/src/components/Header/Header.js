import React, {  useContext, useEffect, useState,  } from "react";
import { SidebarContext } from "../SidebarContext";
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'
import {logout} from '../../actions/userActions'
import {Link as Linke} from 'react-scroll'
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import {logout1} from '../../actions/vendorActions'
import { LinkContainer } from 'react-router-bootstrap'
import { FaShoppingCart } from 'react-icons/fa';
import SearchBox from '../SearchBox';

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    background-color: #000;
    position: absolute;
    top: 60px;
    margin-right: 0px;
    right: ${({ open }) => (open ? '0' : '-100%')};
    width: 90% !important;
    height: calc(100vh - 60px);
    transition: all 0.3s ease-in-out;
    display: ${({ open }) => (open ? 'flex' : 'none')}; 
  }
`;

export const NavItem = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    background-color: #000;
    top: 60px;
    width: 100px;
    margin-left: 25px;
    transition: all 0.3s ease-in-out;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }

  @media screen and (max-width: 768px) {
    margin: 16px 0;
    padding: 14px 0;
    width: 100%;
    display: inline-block;
    margin-left: 4px;
    padding-left: 18px;

    &:hover {
      background-color: #fff;
      color: #010606;
    }
  }
`;

const Navb = () => {
  const [isOpen, setIsOpen] = useContext(SidebarContext);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [home, setHome] = useState(false);
  const history = useNavigate();

  const [showCartButton, setShowCartButton] = useState(false);

  useEffect(() => {
    if(location.pathname === '/'){
      setHome(true)
    }if (location.pathname.startsWith('/store') ) {
      setShowCartButton(true);
    } else {
      setShowCartButton(false);
      setHome(false)
    }
  }, [location.pathname]);
  
  // now you can use the `home` state variable in the rest of your component
  

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const dispatch = useDispatch();
  const [disable, setDisable] = React.useState('');

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const vendorLogin = useSelector(state => state.vendorLogin)
  const { vendorInfo } = vendorLogin
  useEffect(() => {
    if(userInfo){
      setDisable('none')
    }
  }, [userInfo])
  const logoutHandler = () => {
    hand()
    dispatch(logout())
  }

  const logoutHandler1 = () => {
    hand()
    dispatch(logout1())
  }
  const hand=()=>{
    setOpen(false)
  }
  return (
    <>
    {showCartButton ? (
    <Nav style={{ position: scrolled ? "fixed" : "relative", top: 0, width: '100%'  }}>
    <NavLink to='/'>
    <Bars onClick={handleToggle} />
      <img src={require('../../images/log.png')} width={250} height={100} alt='logo' />
    </NavLink>
    <NavMenu open={open} >
      <NavDropdown title="Marketplace" id="basic-nav-dropdown" style={{ color: "white" }}>
<NavDropdown.Item href="/store/products">View Products</NavDropdown.Item>
<NavDropdown.Item href="/store/vendors">View Vendors</NavDropdown.Item>
</NavDropdown>
<div className="nav__right">
              <div className="search__box"><SearchBox />
                </div></div>
 <NavLink to='/store/cart' activeStyle >
 <FaShoppingCart />
      <span>Cart</span>
          </NavLink>
      {userInfo || vendorInfo ? (
           <NavLink to='#'>
           
         </NavLink>
          ) : (
            <NavLink to='/register' activeStyle onClick={hand}>
            Sign Up
          </NavLink>
            )}
      {/* Second Nav */}
      {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
      {userInfo ? (
<NavBtn>
<NavDropdown title={userInfo.name} id='username' style={{color:'#FFFFFF'}}>
  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
</NavBtn>
) : vendorInfo ? (
<NavBtn>
<NavDropdown title={vendorInfo.name} id='vendorname' style={{color:'#FFFFFF'}}>
<LinkContainer to='/store/myvendor'>
                <NavDropdown.Item>My Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/store/myproducts'>
                <NavDropdown.Item>My Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/store/vendor/myorders'>
                <NavDropdown.Item>My Orders</NavDropdown.Item>
              </LinkContainer>
  <NavDropdown.Item onClick={logoutHandler1}>Logout</NavDropdown.Item>
</NavDropdown>
</NavBtn>
) : (
<NavBtn>
<NavBtnLink to='/login' onClick={hand}>Sign In</NavBtnLink>
</NavBtn>
)}
    </NavMenu>
  </Nav>
) : (       //main point to distributing between two type of headers
  <Nav style={{ position: scrolled ? "fixed" : "relative", top: 0, width: '100%'  }}>
  <NavLink to='/'>
  <Bars onClick={handleToggle} />
    <img src={require('../../images/log.png')} width={250} height={100} alt='logo' />
  </NavLink>
  <NavMenu open={open} >
    { home? <Linke to='section-1' activeStyle spy={true} smooth={true} style={{color: '#fff', display: 'flex',
  alignItems:'center', textDecoration:'none', padding:'0 1rem', height:'100%', cursor:'pointer', }}
  onClick={hand}>
      About
    </Linke>: <NavLink to='/about' activeStyle onClick={hand}>
      About
    </NavLink>

    }
    
    <NavLink to='/competitors' activeStyle onClick={hand}>
    Competitors
    </NavLink>
    <NavDropdown title="Marketplace" id="basic-nav-dropdown" style={{ color: "white" }}>
<NavDropdown.Item href="/store/products">View Products</NavDropdown.Item>
<NavDropdown.Item href="/store/vendors">View Vendors</NavDropdown.Item>
</NavDropdown>

    {userInfo || vendorInfo ? (
         <NavLink to='#'>
         
       </NavLink>
        ) : (
          <NavLink to='/register' activeStyle onClick={hand}>
          Sign Up
        </NavLink>
          )}
    {/* Second Nav */}
    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    {userInfo ? (
<NavBtn>
<NavDropdown title={userInfo.name} id='username' style={{color:'#FFFFFF'}}>
<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
</NavBtn>
) : vendorInfo ? (
<NavBtn>
<NavDropdown title={vendorInfo.name} id='vendorname' style={{color:'#FFFFFF'}}>
<LinkContainer to='/store/myvendor'>
              <NavDropdown.Item>My Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/store/myproducts'>
              <NavDropdown.Item>My Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/store/vendor/myorders'>
              <NavDropdown.Item>My Orders</NavDropdown.Item>
            </LinkContainer>
<NavDropdown.Item onClick={logoutHandler1}>Logout</NavDropdown.Item>
</NavDropdown>
</NavBtn>
) : (
<NavBtn>
<NavBtnLink to='/login' onClick={hand}>Sign In</NavBtnLink>
</NavBtn>
)}
  </NavMenu>
</Nav>
)}
    </>
  );
};

export default Navb;
