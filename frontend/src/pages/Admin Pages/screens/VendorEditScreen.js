import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { getVendorDetailsA, updateVendor } from '../../../actions/vendorActions'
import { VENDOR_UPDATE_RESET } from '../../../constants/vendorConstants'

const VendorEditScreen = () => {
  const {id} = useParams();
  const vendorId = id
  const history = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const vendorDetails = useSelector((state) => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

  const vendorUpdate = useSelector((state) => state.vendorUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vendorUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VENDOR_UPDATE_RESET })
      history(`/admin/vendorlist`)
    } else {
      if (!vendor || vendor._id !== vendorId) {
        dispatch(getVendorDetailsA(vendorId))
      } else {
        setName(vendor.name)
        setEmail(vendor.email)
      }
    }
  }, [dispatch, history, vendorId, vendor, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateVendor({ _id: vendorId, name, email}))
  }

  return (
    <div class="col main pt-2 mt-1">
    <>
      <Link to='/admin/vendorlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Vendor</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                <br/>
                <Button type='submit' variant='primary'>
                  Update
            </Button>
              </Form>
            )}<br/><br/>
      </FormContainer>
    </></div>
  )
}

export default VendorEditScreen