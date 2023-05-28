import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card,  Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
  listVendorcreationDetails,
  createVendorcreationReview,
} from '../../actions/vendorcreationActions'
import { VENDORCREATION_CREATE_REVIEW_RESET } from '../../constants/vendorcreationConstants'

const SingleVendorScreen = () => {
  const {id} = useParams();
  const history = useNavigate();

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const vendorcreationDetails = useSelector((state) => state.vendorcreationDetails)
  const { loading, error, vendorcreation } = vendorcreationDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const vendorcreationReviewCreate = useSelector((state) => state.vendorcreationReviewCreate)
  const {
    success: successVendorcreationReview,
    loading: loadingVendorcreationReview,
    error: errorVendorcreationReview,
  } = vendorcreationReviewCreate

  useEffect(() => {
    if (successVendorcreationReview) {
      setRating(0)
      setComment('')
    }
    if (!vendorcreation._id || vendorcreation._id !== id) {
      dispatch(listVendorcreationDetails(id))
      dispatch({ type: VENDORCREATION_CREATE_REVIEW_RESET })
    }
  }, [dispatch, id, successVendorcreationReview, vendorcreation._id])

  const visitHandler = () => {
    history(`/store/vendor/products/${id}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createVendorcreationReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <div className='othermain'>
    <>
      <Link className='btn btn-light my-3' to='/store/vendors'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Meta title={vendorcreation.name} />
              <Row>
                <Col md={6}>
                  <Image src={vendorcreation.image} alt={vendorcreation.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{vendorcreation.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={vendorcreation.rating}
                        text={`${vendorcreation.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {vendorcreation.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Catogory:</Col>
                          <Col>
                            <strong>{vendorcreation.category}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Location:</Col>
                          <Col>
                            <strong>{vendorcreation.location}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      
                      <ListGroup.Item>
                      <Row>
                          <Col>Contact No:</Col>
                          <Col>
                            <strong>{vendorcreation.cnt}</strong>
                          </Col>
                        </Row>
                        
                      </ListGroup.Item>
                      <ListGroup.Item>
                      <Row>
                          <Col>Email</Col>
                          <Col>
                            <strong>{vendorcreation.email}</strong>
                          </Col>
                        </Row>
                        
                      </ListGroup.Item>
                      <ListGroup.Item>
                      <Button
                          onClick={visitHandler}
                          className='btn-block'
                          type='button'
                        >
                          See Products
                    </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
              <h2>Reviews</h2>
              {vendorcreation.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {vendorcreation.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successVendorcreationReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingVendorcreationReview && <Loader />}
                  {errorVendorcreationReview && (
                    <Message variant='danger'>{errorVendorcreationReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingVendorcreationReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
              </Row>
            </>
          )}<br/><br/>
    </> </div>
  )
}

export default SingleVendorScreen