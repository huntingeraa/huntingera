import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import UserListScreen from '../screens/UserListScreen';
import UserEditScreen from '../screens/UserEditScreen';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function UsersLayout() {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const location = useLocation();
  const { id } = useParams();
  const history=useNavigate()

  useEffect(() => {
    if (!adminInfo) {
      history(`/admin`);
    }
  }, [adminInfo, history]);

  const isUserListRoute = location.pathname === '/admin/userlist';
  const isUserEditRoute = location.pathname === `/admin/user/${id}/edit`;

  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
          {isUserListRoute ? (
            <UserListScreen />
          ) : isUserEditRoute ? (
            <UserEditScreen />
          ) : (
            <p>Invalid route path</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersLayout;
