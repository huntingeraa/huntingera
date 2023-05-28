import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions';

const ProductsScreen = () => {
  const {keyword} = useParams();

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword]);

  return (
    <div className='othermain'>
    <>
      <Meta />
      {!keyword ? (
        < ></>
      ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )
      }
    <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Our Listed Products</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      )  : products.length === 0 ? (
        <Message variant='info'>No Such Product found</Message>
      ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </></div>
  )
}

export default ProductsScreen