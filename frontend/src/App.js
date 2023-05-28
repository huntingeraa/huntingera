import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Home Pages/Dashboard.jsx';
import About from './pages/About Pages/About.jsx';
import Navbar from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login Pages/Login";
import Register from "./pages/Login Pages/Register";
import VLogin from "./pages/Login Pages/VendorLogin";
import VRegister from "./pages/Login Pages/VendorRegister";
import Strend from './pages/Trend Pages/Strend';
import { SidebarProvider } from './components/SidebarContext';
import Competitors from './pages/Competitors Pages/Competitors';
import Ctrend from './pages/Competitors Pages/Ctrend';
import VendorCreation from './pages/Marketplace Pages/VendorCreation';
import VendorAddScreen from './pages/Marketplace Pages/VendorAddScreen';
import VendorsScreen from './pages/Marketplace Pages/VendorsScreen'
import SingleVendorScreen from './pages/Marketplace Pages/SingleVendorScreen';
import VendorProfile from './pages/Marketplace Pages/VendorProfile';
import VendorEditScreen from './pages/Marketplace Pages/VendorEditScreen';
import MyVendor from './pages/Marketplace Pages/VendorProfileScreen';
import MyUser from './pages/Home Pages/UserProfileScreen';
import ProductListScreen from './pages/Marketplace Pages/ProductListScreen';
import ProductAddScreen from './pages/Marketplace Pages/ProductAddScreen';
import ProductEditScreen from './pages/Marketplace Pages/ProductEditScreen';
import ProductsScreen from './pages/Marketplace Pages/ProductsScreen';
import ProductScreen from './pages/Marketplace Pages/ProductScreen';
import VendorProductScreen from './pages/Marketplace Pages/VendorProductScreen';
import CartScreen from './pages/Marketplace Pages/CartScreen';
import ShippingScreen from './pages/Marketplace Pages/ShippingScreen';
import PaymentScreen from './pages/Marketplace Pages/PaymentScreen';
import PlaceOrderScreen from './pages/Marketplace Pages/PlaceOrderScreen';
import OrderScreen from './pages/Marketplace Pages/OrderScreen';
import OrderListScreen from './pages/Marketplace Pages/OrderListScreen';
import VendorOrderScreen from './pages/Marketplace Pages/VendorOrderScreen';
import AdminLogin from './pages/Admin Pages/AdminLogin';
import AdminOtp from './pages/Admin Pages/AdminOtp';
import Layout from './pages/Admin Pages/adminLayouts/Layout';
import UsersLayout from './pages/Admin Pages/adminLayouts/UsersLayout';
import VendorsLayout from './pages/Admin Pages/adminLayouts/VendorsLayout';
import ProfilesLayout from './pages/Admin Pages/adminLayouts/ProfilesLayout';
import ProductsLayout from './pages/Admin Pages/adminLayouts/ProductsLayout';
import OrdersLayout from './pages/Admin Pages/adminLayouts/OrdersLayout';
import EmailsLayout from './pages/Admin Pages/adminLayouts/EmailsLayout';

const App = () => {
  const currentPath = window.location.pathname;
  return (
    <BrowserRouter>
    <SidebarProvider>
    {currentPath.startsWith('/admin') ? (
          <Routes>
            <Route path="/admin" element={<AdminLogin />} /> 
            <Route path="/adminotp" element={<AdminOtp />} /> 
            <Route path="/admindash" element={<Layout />} /> 
            <Route path="/admin/userlist" element={<UsersLayout />} /> 
            <Route path="/admin/user/:id/edit" element={<UsersLayout />} /> 
            <Route path="/admin/vendorlist" element={<VendorsLayout />} /> 
            <Route path="/admin/vendor/:id/edit" element={<VendorsLayout />} />
            <Route path="/admin/vendorcreationlist" element={<ProfilesLayout />} /> 
            <Route path="/admin/vendorcreation/:id/edit" element={<ProfilesLayout />} />
            <Route path="/admin/productlist" element={<ProductsLayout />} /> 
            <Route path="/admin/product/:id/edit" element={<ProductsLayout />} />
            <Route path="/admin/orderlist" element={<OrdersLayout />} /> 
            <Route path="/admin/order/:id/" element={<OrdersLayout />} />
            <Route path="/admin/emaillist" element={<EmailsLayout />} />
          </Routes>
        ) : (
          <>
    <Navbar/>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/:keyword" element={<Strend/>} exact/>
          <Route path="/about" element={<About />}  />
          <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/vlogin" element={<VLogin/>} />
        <Route path="/vregister" element={<VRegister/>} />
        <Route path="/store/vregister/vendorcreation" element={<VendorCreation/>} />
        <Route path="/store/vendorcreation/vendoradd" element={<VendorAddScreen/>} />
        <Route path="/store/vendors" element={<VendorsScreen/>} />
        <Route path="/store/vendors/search/:keyword" element={<VendorsScreen/>} />
        <Route path="/store/vendor/:id" element={<SingleVendorScreen/>} />
        <Route path="/store/myvendor" element={<VendorProfile/>} />
        <Route path="/store/myvendor/:id/edit" element={<VendorEditScreen/>} />
        <Route path="/store/myvendor/vprofile" element={<MyVendor/>} />
        <Route path="/user" element={<MyUser/>} />
        <Route path="/vendor" element={<MyVendor/>} />
        <Route path="/store/myproducts" element={<ProductListScreen/>} />
        <Route path="/store/myproducts/add" element={<ProductAddScreen/>} />
        <Route path="/store/myproducts/:id/edit" element={<ProductEditScreen/>} />
        <Route path="/store/products" element={<ProductsScreen/>} />
        <Route path="/store/products/search/:keyword" element={<ProductsScreen/>} />
        <Route path="/store/product/:id" element={<ProductScreen/>} />
        <Route path="/store/product/cart/:id" element={<CartScreen/>} />
        <Route path="/store/cart" element={<CartScreen/>} />
        <Route path="/store/product/shipping" element={<ShippingScreen/>} />
        <Route path="/store/product/payment" element={<PaymentScreen/>} />
        <Route path="/store/product/placeorder" element={<PlaceOrderScreen/>} />
        <Route path="/store/product/order/:id" element={<OrderScreen/>} />
        <Route path="/store/vendor/products/:id" element={<VendorProductScreen/>} />
        <Route path="/store/vendor/myorders" element={<OrderListScreen/>} />
       
        <Route path="/store/vendor/order/:id" element={<VendorOrderScreen/>} />        
          <Route path="/competitors" element={<Competitors />} /> 
          <Route path="/:keyword/competitors" element={<Ctrend />} /> 
        </Routes>
        <Footer/>
      </Sidebar>
      </>)}
      </SidebarProvider>
    </BrowserRouter>
    
  );
};

export default App;