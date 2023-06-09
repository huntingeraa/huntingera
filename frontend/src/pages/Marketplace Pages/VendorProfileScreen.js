import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getVendorDetails, updateVendorProfile } from '../../actions/vendorActions'
import { listMyOrders } from '../../actions/orderActions'
import { VENDOR_UPDATE_PROFILE_RESET } from '../../constants/vendorConstants'

const VendorProfileScreen = () => {
  const history=useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const vendorDetails = useSelector((state) => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

  const vendorLogin = useSelector((state) => state.vendorLogin)
  const { vendorInfo } = vendorLogin

  const vendorUpdateProfile = useSelector((state) => state.vendorUpdateProfile)
  const { success } = vendorUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!vendorInfo) {
      history(`/vlogin`)
    } else {
      if (!vendor || !vendor.name || success) {
        dispatch({ type: VENDOR_UPDATE_PROFILE_RESET })
        dispatch(getVendorDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(vendor.name)
        setEmail(vendor.email)
      }
    }
  }, [dispatch, history, vendorInfo, vendor, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateVendorProfile({ id: vendor._id, name, email, password }))
    }
  }

  return (
    <div className='othermain'>
        <h2>Vendor profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {/* {error && <Message variant='danger'>{error}</Message>} */}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
              <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
        </Button>
              </Form>
            )}

     <br/><br/>
    </div>
  )
}

export default VendorProfileScreen