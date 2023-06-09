import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants'
import dateFormat from 'dateformat'
import StripeCheckout from 'react-stripe-checkout';

const OrderScreen = () => {
const {id}=useParams()
  const orderId = id
  const history = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history(`/login`)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }



const Ontoken=token=>{
  let totalamount= order.totalPrice
  let orderid=order._id
  
  
  const data={token, totalamount, orderid}
  axios.post('http://localhost:5000/api/pay/payment', data).then(res=>{
    console.log(res)
    alert("Payment Successed")
    dispatch(payOrder(orderid))
    history(`/store/product/order/${order._id}`)
  }
  ).catch(err=> console.log(err))
}

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (<div className='othermain'>
        <><br/><br/>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {dateFormat(order.deliveredAt)}
                    </Message>
                  ) : (
                      <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {dateFormat(order.paidAt)}</Message>
                  ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/store/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                  <StripeCheckout
    stripeKey="pk_test_51MvpNODUEGxVKIanizNEwN6BbaJm56KrOL7af4XcetYzU05senydwPJy1sOzrGjo6fRjDXXgChReA8dX3CXDoh8Z00XJbhnC3Q"
    token={Ontoken}
    amount={order.totalPrice*100}
    description={`Total To be Paid: $ ${order.totalPrice}`}
    data-amount={order.totalPrice}/>)}

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                    </ListGroup.Item>
                  )}
                  
                </ListGroup>
              </Card>
            </Col>
          </Row><br/><br/>
        </></div>
      )
}

export default OrderScreen