import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import OrderListScreen from '../screens/OrderListScreen';
import OrderScreen from '../screens/OrderScreen';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';
function OrdersLayout(){
    const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  const location = useLocation();
  const { id } = useParams();
  const history=useNavigate()

  useEffect(() => {
    if (!adminInfo) {
      history(`/admin`);
    }
  }, [adminInfo, history]);

  const isOrderListRoute = location.pathname === '/admin/orderlist';
  const isOrderRoute = location.pathname === `/admin/order/${id}`;
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                   {isOrderListRoute ? (
            <OrderListScreen />
          ) : isOrderRoute ? (
            <OrderScreen />
          ) : (
            <p>Invalid route path</p>
          )}
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default OrdersLayout

