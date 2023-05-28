import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';


 
function ProductsLayout(){
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
  const isProductListRoute = location.pathname === '/admin/productlist';
  const isProductEditRoute = location.pathname === `/admin/product/${id}/edit`;

 
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                   {isProductListRoute ? (
            <ProductListScreen />
          ) : isProductEditRoute ? (
            <ProductEditScreen />
          ) : (
            <p>Invalid route path</p>
          )}
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default ProductsLayout

