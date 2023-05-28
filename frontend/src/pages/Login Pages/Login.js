import React, { useState, useEffect,useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userActions'

const Login = () => {
  const location = useLocation();
 const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <FormContainer className="p-0 m-0">
      <h1 className="text-center" style={{fontSize:'50px', fontFamily:'Roboto', paddingRight:'190px' }}>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler} className="mx-auto" style={{maxWidth: '400px'}}>
        <Form.Group controlId='email' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label className="small">Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label className="small">Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3" type='submit' variant='primary' block style= {{marginLeft: isMobile?'-10px':'50px' }}>
          Sign In
        </Button>
      </Form>
      <Row className='py-3' style={{textAlign: 'center', paddingRight:'190px'}} >
        <Col>
          Login As a Vendor?{' '}
          <Link to={redirect ? `/vlogin?redirect=${redirect}` : '/vlogin'}>
            Login
          </Link>
        </Col>
      </Row>

      <Row className='py-3' style={{textAlign: 'center', paddingRight:'190px'}} >
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
      
    </FormContainer>
  )
}

export default Login
