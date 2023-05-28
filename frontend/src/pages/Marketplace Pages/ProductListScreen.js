import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link,useParams, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductListScreen = () => {
  const history=useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch()

  const productListMy = useSelector((state) => state.productListMy)
  const { loading, error, products } = productListMy

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

  const vendorLogin = useSelector((state) => state.vendorLogin)
  const { vendorInfo } = vendorLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!vendorInfo || !vendorInfo.isAdmin) {
      history(`/vlogin`)
    } if (successCreate) {
      history(`/store/myproducts`)
    } else {
      dispatch(listMyProducts(''))
    }
  }, [
    dispatch,
    history,
    vendorInfo,
    successDelete,
    successCreate,
    createdProduct,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    history(`/store/myproducts/add`)
  }

  return (
    <div className='othermain'>
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
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
                     <td><Link to={`/store/product/${product._id}`}>{product._id}</Link></td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.vendor}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.description}</td>
                      <td>
                        <LinkContainer to={`/store/myproducts/${product._id}/edit`}>
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
    </></div>
  )
}

export default ProductListScreen