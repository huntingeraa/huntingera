import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'

const ShippingScreen = () => {
  const history=useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, postalCode, country }))
    history(`/store/product/payment`)
  }
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

  return (
    <div className='othermain'>
      <br/><br/>
    <CheckoutSteps step1 step2 />
    <FormContainer>
      <h1>Shipping Details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            maxLength={40}
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='number'
            maxLength = "6" 
            onInput={maxLengthCheck}
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
                  <Form.Control
          as="select"
          value={country}
          onChange={e => {
            setCountry(e.target.value);
          }}
        >
            <option value="" >Please Choose Location</option>
        <option value="China">China</option>
        <option value="Turkey">Turkey</option>
        <option value="America">America</option>
        </Form.Control>
                </Form.Group>
                <br/>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
      <br/><br/>
    </FormContainer>
  </div>
  )
}

export default ShippingScreen