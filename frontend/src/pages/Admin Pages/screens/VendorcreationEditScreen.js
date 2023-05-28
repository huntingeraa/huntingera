import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { listVendorcreationDetails, updateVendorcreationA } from '../../../actions/vendorcreationActions'
import { VENDORCREATION_UPDATE_RESET } from '../../../constants/vendorcreationConstants'

const VendorcreationEditScreen = () => {
  const {id} = useParams();
  const vendorcreationId = id
  const history = useNavigate()

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [cnt, setCnt] = useState('')
  const [email, setEmail] = useState('')

  const [location, setLocation] = useState('')

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const vendorcreationDetails = useSelector((state) => state.vendorcreationDetails)
  const { loading, error, vendorcreation } = vendorcreationDetails

  const vendorcreationUpdate = useSelector((state) => state.vendorcreationUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vendorcreationUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VENDORCREATION_UPDATE_RESET })
      history(`/admin/vendorcreationlist`)
    } else {
      if (!vendorcreation.name || vendorcreation._id !== vendorcreationId) {
        dispatch(listVendorcreationDetails(vendorcreationId))
      }else {
        setName(vendorcreation.name)
        setImage(vendorcreation.image)
        setDescription(vendorcreation.description)
        setCategory(vendorcreation.category)
        setCnt(vendorcreation.cnt)
        setEmail(vendorcreation.email)
        setLocation(vendorcreation.location)
      }
    }
  }
  , [dispatch, history, vendorcreationId, vendorcreation, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVendorcreationA({
        _id: vendorcreationId,
        name,
        image,
        description,
        category,
        cnt,
        email,
        location,
      })
    )
  }
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

  return (
    <div class="col main pt-2 mt-1">
    <>
      <Link to='/admin/vendorcreationlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Vendor Profile</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              maxLength={15}
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image (must be in jpg,png)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='file'
              id='image-file'
              label='Choose File'
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              maxLength={50}
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
            <Form.Control
    as="select"
    value={category}
    onChange={e => {
      setCategory(e.target.value);
    }}
  >
     <option value="" disabled>Please Choose Category</option>
  <option value="Clothing">Clothing</option>
  <option value="Household">Household</option>
  <option value="Fashion">Fashion</option>
  </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Professional Email</Form.Label>
            <Form.Control
      type='email'
      placeholder='Enter email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='cnt'>
            <Form.Label>Contact No</Form.Label>
            <Form.Control
              type='number'
              maxLength = "11" 
              onInput={maxLengthCheck}
              placeholder='Enter cnt'
              value={cnt}
              onChange={(e) => setCnt(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='location'>
          <Form.Label>Location</Form.Label>
            <Form.Control
    as="select"
    value={location}
    onChange={e => {
      setLocation(e.target.value);
    }}
  >
     <option value="" disabled>Please Choose Location</option>
  <option value="China">China</option>
  <option value="Turkey">Turkey</option>
  <option value="America">America</option>
  </Form.Control>
          </Form.Group>

          <br/>
          <Button type='submit' variant='primary'>
            Update
      </Button>
        </Form>
            )}<br/><br/><br/><br/>
      </FormContainer>
    </></div>
  )
}

export default VendorcreationEditScreen