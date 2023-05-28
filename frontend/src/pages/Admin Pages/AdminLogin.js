import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { login }from '../../actions/adminActions'
import '../../styles/adminlogin.css';
import {ADMIN_LOGOUT} from '../../constants/adminConstants'

const AdminLogin = () => {
  const history=useNavigate();
  const location=useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error, adminInfo } = adminLogin
  const redirect = location.search ? location.search.split('=')[1] : '/adminotp'


  useEffect(() => {
    if (adminInfo) {
      history(redirect)
      localStorage.removeItem('adminInfo')
  dispatch({ type: ADMIN_LOGOUT })
    }else {
    }
  }, [history, adminInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(login(email, password))
  }
  return (
    <div className="bg-primary py-5" style={{overflowX: 'hidden'}}>
      <div className="container">
        <div className="card mx-auto bg-white shadow-lg" style={{ maxWidth: "1200px" }}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <a href={'/'}>
                <img src={require('../../images/log2.png')} width={250} height={100} alt='logo' style={{marginLeft: '10px'}} />
              </a>
              <h1 className="card-title text-center mb-4 ms-3">Welcome to Admin Panel</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img
                  alt="hey"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <form className="login-form" onSubmit={submitHandler}>
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Login Please!!</h1>
                  </div>
                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input type="email" value={email} id="form3Example3" className="form-control form-control-lg"
                      placeholder="Enter a valid email address" onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" value={password} id="form3Example4" className="form-control form-control-lg"
                      placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="text-center text-lg-start mt-4 pt-2">
    <button type="submit" className="btn btn-primary btn-lg">Login</button>
  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
