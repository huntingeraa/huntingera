import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listProducts, deleteProductA } from '../../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import {  RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!adminInfo || !adminInfo.isAdmin) {
      history(`/admin`)
    } if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts(''))
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
    successCreate,
    createdProduct
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProductA(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>VENDOR</th>
                    <th>STOCK</th>
                    <th>DESCRIPTION</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.vendor}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.description}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                          <i><RiEdit2Line/></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                         <i><RiDeleteBinLine/></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}<br/><br/><br/><br/>
    </> </div>
  )
}

export default ProductListScreen