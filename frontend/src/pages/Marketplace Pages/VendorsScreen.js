import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Vendor from '../../components/Vendorcreation'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listVendorcreations } from '../../actions/vendorcreationActions';

const VendorsScreen = () => {
  const {keyword} = useParams();


  const dispatch = useDispatch();

  const vendorcreationList = useSelector(state => state.vendorcreationList);
  const { loading, error, vendorcreations } = vendorcreationList;

  useEffect(() => {
    dispatch(listVendorcreations(keyword))
  }, [dispatch, keyword]);

  return (
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
      }}>Vendors Profiles</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      )  : vendorcreations.length === 0 ? (
        <Message variant='info'>No such Vendor found</Message>
      ) : (
            <div className='othermain'>
              <Row>
                {vendorcreations.map((vendorcreation) => (
                  <Col key={vendorcreation._id} sm={12} md={6} lg={4} xl={3}>
                    <Vendor vendorcreation={vendorcreation} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
    </>
  )
}

export default VendorsScreen