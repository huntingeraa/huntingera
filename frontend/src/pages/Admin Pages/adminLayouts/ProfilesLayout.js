import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import VendorcreationListScreen from '../screens/VendorcreationListScreen';
import VendorcreationEditScreen from '../screens/VendorcreationEditScreen';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';
 
function ProfilesLayout(){
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
  const isVendorcreationListRoute = location.pathname === '/admin/vendorcreationlist';
  const isVendorcreationEditRoute = location.pathname === `/admin/vendorcreation/${id}/edit`;

 
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                   {isVendorcreationListRoute ? (
            <VendorcreationListScreen />
          ) : isVendorcreationEditRoute ? (
            <VendorcreationEditScreen />
          ) : (
            <p>Invalid route path</p>
          )}
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default ProfilesLayout

