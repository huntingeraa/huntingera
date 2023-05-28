import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listOrders, deleteOrder } from '../../../actions/orderActions'
import { RiCloseLine, RiDeleteBinLine} from 'react-icons/ri';

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const history= useNavigate()

  const orderList= useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history(`/admin`)
    }
  }, [dispatch, history, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteOrder(id))
    }
  }


  return (
    <div class="col main pt-5 mt-3">
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                          <i style={{ color: 'red' }}><RiCloseLine/></i>
                        )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                          <i style={{ color: 'red' }}><RiCloseLine/></i>
                        )}
                    </td>
                    <td>
                    <Button
                          variant='danger'
                          className='btn-sm d-flex justify-content-center'
                          onClick={() => deleteHandler(order._id)}
                        >
                          <i><RiDeleteBinLine/></i>
                        </Button>

                      <LinkContainer to={`/admin/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                    </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </></div>
  )
}

export default OrderListScreen