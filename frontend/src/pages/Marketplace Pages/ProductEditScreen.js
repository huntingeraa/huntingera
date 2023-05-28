import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,  useParams, useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = () => {
  const {id} = useParams();
  const history = useNavigate();

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState([])
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history(`/store/myproducts`)
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, id, product, successUpdate])

  
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('image', e.target.files[i]);
    }
  
    setUploading(true)
  
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
         
      const { data } = await axios.post('/api/uploadm', formData, config)
      const imagePaths = data.paths
      setImage(imagePaths)
  
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <div className='othermain'>
    <>
      <Link to='/store/myproducts' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                 
                <Form.Group controlId='image'>
                  <Form.Label>Image (must be 4 picture in jpg,png)</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    multiple
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                   <Form.Control
                    type='file'
                    id='image-file'
                    label='Choose File'
                    multiple
                    onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
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

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
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

export default ProductEditScreen