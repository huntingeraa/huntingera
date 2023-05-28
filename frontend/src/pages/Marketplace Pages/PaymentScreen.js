import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'

const PaymentScreen = () => {
  const history=useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history(`/store/product/shipping`)
  }

  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history(`/store/product/placeorder`)

  }

  return (
    <div className='othermain'>
      <br/><br/>
    <CheckoutSteps step1 step2 step3 />
    <FormContainer>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
          <Form.Check
              type='radio'
              label='Pay through Debit/Credit Card'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> 
          </Col>
        </Form.Group>
        <br/>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form><br/><br/>
    </FormContainer>
    </div>
  )
}

export default PaymentScreen