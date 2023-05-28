import React, { useState, useEffect,useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation,  useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { register } from '../../actions/vendorActions'
import ReactPasswordChecklist from 'react-password-checklist'

const VendorRegister = () => {
  const location = useLocation();
  const history = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const handlePasswordChecklistChange = (isValid) => {
    setIsPasswordValid(isValid);
  };
  const isRegisterDisabled = !isPasswordValid

  const dispatch = useDispatch()

  const vendorRegister = useSelector((state) => state.vendorRegister)
  const { loading, error, vendorInfo } = vendorRegister

  const redirect = location.search ? location.search.split('=')[1] : '/store/vregister/vendorcreation'

  useEffect(() => {
    if (vendorInfo) {
      history(`/store/vregister/vendorcreation`)
    }
  }, [history, vendorInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
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
       <h1 className="text-center" style={{fontSize:'50px', fontFamily:'Roboto', paddingRight:'190px'}}>Vendor Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="mx-auto" style={{maxWidth: '400px'}}>

        <Form.Group controlId='name' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId='password' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label >Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            //value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <ReactPasswordChecklist
          rules={["length","specialChar","number","capital"]}
          minLength={8}
          value={password}
          onChange={handlePasswordChecklistChange} 
          />
        </Form.Group>

        <Form.Group controlId='confirmPassword' style= {{width: isMobile?'500px':'500px',marginLeft: isMobile?'-80px':'-30px' }}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3"  type='submit' variant='primary' block
        style= {{marginLeft: isMobile?'-10px':'50px' }} disabled={isRegisterDisabled}>
          Register
        </Button>
      </Form>
      <Row className='py-3' style={{textAlign: 'center', paddingRight:'190px'}}>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/vlogin?redirect=${redirect}` : '/vlogin'}>
            Login
          </Link>
        </Col>
      </Row>
      <Row className='py-3' style={{textAlign: 'center', paddingRight:'190px'}}>
      <Col>
          Register As a User?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
        </Row>
    </FormContainer>
  )
}

export default VendorRegister