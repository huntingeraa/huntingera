import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import VendorListScreen from '../screens/VendorListScreen'
import VendorEditScreen from '../screens/VendorEditScreen';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';
 
function VendorsLayout(){
    const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  const location = useLocation();
  const { id } = useParams();
  const history=useNavigate()

  useEffect(() => {

    if (!adminInfo ) {
      history(`/admin`);
    } 
  }, [
    adminInfo
  ])
  const isVendorListRoute = location.pathname === '/admin/vendorlist';
  const isVendorEditRoute = location.pathname === `/admin/vendor/${id}/edit`;
 
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                   {isVendorListRoute ? (
            <VendorListScreen />
          ) : isVendorEditRoute ? (
            <VendorEditScreen />
          ) : (
            <p>Invalid route path</p>
          )}
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default VendorsLayout

