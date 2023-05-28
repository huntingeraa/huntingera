import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listSProducts } from '../../actions/productActions';
import {
  listVendorcreationDetails,
} from '../../actions/vendorcreationActions'

const VendorProductScreen = () => {
  const { id, keyword } = useParams();
  const vendorcreationId = id

  const dispatch = useDispatch();

  const productSList = useSelector(state => state.productSList);
  const { loading, error, products } = productSList;

  const vendorcreationDetails = useSelector((state) => state.vendorcreationDetails)
  const { vendorcreation } = vendorcreationDetails

  useEffect(() => {
    dispatch(listSProducts(keyword, vendorcreationId))
    if (!vendorcreation._id || vendorcreation._id !== id) {
      dispatch(listVendorcreationDetails(id))
    }
  }, [dispatch, keyword, vendorcreationId]);

  return (
    <div className='othermain'>
    <>
     
      <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{vendorcreation.name}</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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

export default VendorProductScreen