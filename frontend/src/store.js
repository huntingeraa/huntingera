import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import trend from './reducers/trendReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/userReducers';
import {
  vendorLoginReducer,
  vendorRegisterReducer,
  vendorDetailsReducer,
  vendorUpdateProfileReducer,
  vendorListReducer,
  vendorDeleteReducer,
  vendorUpdateReducer
} from './reducers/vendorReducers';

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productListMyReducer,
  productSListReducer,
} from './reducers/productReducers';

import {
  vendorcreationListReducer,
  vendorcreationDetailsReducer,
  vendorcreationDeleteReducer,
  vendorcreationCreateReducer,
  vendorcreationUpdateReducer,
  vendorcreationReviewCreateReducer,
  vendorcreationTopRatedReducer,
  vendorcreationListMyReducer,
} from './reducers/vendorcreationReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListMReducer,
  orderListReducer,
  orderDeleteReducer
} from './reducers/orderReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  adminLoginReducer,
  adminRegisterReducer,
  adminDetailsReducer,
  adminUpdateProfileReducer,
  adminListReducer,
  adminDeleteReducer,
  adminUpdateReducer
} from './reducers/adminReducers'

import {
  overviewListReducer,
  overviewCreateReducer,
  overviewUpdateReducer,
} from './reducers/overviewReducers';

import { emailRegisterReducer , emailListReducer, emailDeleteReducer} from './reducers/emailReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  trend,
  vendorLogin: vendorLoginReducer,
  vendorRegister: vendorRegisterReducer,
  vendorDetails: vendorDetailsReducer,
  vendorUpdateProfile: vendorUpdateProfileReducer,
  vendorList: vendorListReducer,
  vendorDelete: vendorDeleteReducer,
  vendorUpdate: vendorUpdateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productListMy: productListMyReducer,
  productSList: productSListReducer,
  vendorcreationList: vendorcreationListReducer,
  vendorcreationDetails: vendorcreationDetailsReducer,
  vendorcreationDelete: vendorcreationDeleteReducer,
  vendorcreationCreate: vendorcreationCreateReducer,
  vendorcreationUpdate: vendorcreationUpdateReducer,
  vendorcreationReviewCreate: vendorcreationReviewCreateReducer,
  vendorcreationTopRated: vendorcreationTopRatedReducer,
  vendorcreationListMy: vendorcreationListMyReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderListM: orderListMReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,

  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  adminDetails: adminDetailsReducer,
  adminUpdateProfile: adminUpdateProfileReducer,
  adminList: adminListReducer,
  adminDelete: adminDeleteReducer,
  adminUpdate: adminUpdateReducer,

  overviewList: overviewListReducer,
  overviewCreate: overviewCreateReducer,
  overviewUpdate: overviewUpdateReducer,
  
  emailRegister: emailRegisterReducer,
  emailList: emailListReducer,
  emailDelete: emailDeleteReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const vendorInfoFromStorage = localStorage.getItem('vendorInfo')
  ? JSON.parse(localStorage.getItem('vendorInfo'))
  : null;

const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;
  const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,

  },
  userLogin: { userInfo: userInfoFromStorage },
  vendorLogin: { vendorInfo: vendorInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
  
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
