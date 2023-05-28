import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { RiDashboardLine, RiUserLine, RiShoppingBagLine, RiTeamLine, RiUserSettingsLine, RiShoppingCartLine, RiMailLine } from 'react-icons/ri';
const Sidebar = () => {
  const location = useLocation();
const isActiveOrder = location.pathname.startsWith('/admin/order');
const isActiveUser = location.pathname.startsWith('/admin/user');
const isActiveVendor = location.pathname.startsWith('/admin/vendor');
const isActiveProfile = location.pathname.startsWith('/admin/vendorcreation');
const isActiveProduct = location.pathname.startsWith('/admin/product');

  return (
    <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li className="nav-item mb-2 mt-3">
          <a className="nav-link text-secondary" href="#">
            <h5>Welcome Admin</h5>
          </a>
        </li>
        <LinkContainer to='/admindash'>
          <li className="nav-item mb-2 ">
            <a className="nav-link text-secondary" href="#">
              <i><RiDashboardLine/></i>
              <span className="ml-3">Overview</span>
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to='/admin/userlist'>
  <li className={`nav-item mb-2 ${isActiveUser ? 'active' : ''}`}>
            <a className="nav-link text-secondary" href="#">
              <i><RiUserLine /></i>
              <span className="ml-3">Users</span>
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to='/admin/vendorlist'>
  <li className={`nav-item mb-2 ${isActiveVendor ? 'active' : ''}`}>
            <a className="nav-link text-secondary" href="#">
              <i><RiTeamLine /></i>
              <span className="ml-3">Vendors</span>
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to='/admin/vendorcreationlist'>
        <li className={`nav-item mb-2 ${isActiveProfile ? 'active' : ''}`}>
            <a className="nav-link text-secondary" href="#">
              <i><RiUserSettingsLine /></i>
              <span className="ml-3">Profiles</span>
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to='/admin/productlist'>
  <li className={`nav-item mb-2 ${isActiveProduct ? 'active' : ''}`}>
            <a className="nav-link text-secondary" href="#">
              <i><RiShoppingBagLine /></i>
              <span className="ml-3">Products</span>
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to="/admin/orderlist" exact>
  <li className={`nav-item mb-2 ${isActiveOrder ? 'active' : ''}`}>
    <a className="nav-link text-secondary" href="#">
      <i><RiShoppingCartLine /></i>
      <span className="ml-3">Orders</span>
    </a>
  </li>
</LinkContainer>
        <LinkContainer to='/admin/emaillist'>
          <li className="nav-item mb-2">
            <a className="nav-link text-secondary" href="#">
              <i><RiMailLine /></i>
              <span className="ml-3">Emails</span>
            </a>
          </li>
        </LinkContainer>
      </ul>
    </div>

    )
}
 
export default Sidebar