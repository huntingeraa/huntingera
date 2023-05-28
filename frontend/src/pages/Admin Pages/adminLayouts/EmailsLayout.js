import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EmailListScreen from '../screens/EmailListScreen'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';

function EmailsLayout(){
  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  const history=useNavigate()

  useEffect(() => {

    if (!adminInfo ) {
      history(`/admin`)
    } 
  }, [
    adminInfo
  ])

 
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <EmailListScreen/>
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default EmailsLayout

