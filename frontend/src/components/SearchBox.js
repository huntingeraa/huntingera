import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const history = useNavigate();
  const [decide, setDecide] = useState(true);
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history(`/store/products/search/${keyword}`)
    } else {
      history(`/`)
    }
  }
  const vsubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history(`/store/vendors/search/${keyword}`)
    } else {
      history(`/`)
    }
  }
  useEffect(() => {
    if (location.pathname.startsWith('/store/products')) {
      setDecide(true);
    } 
    if (location.pathname.startsWith('/store/vendors')){
      setDecide(false);
    }
  }, [location.pathname]);

  return (
    <>
    {decide ?(
      <Form onSubmit={submitHandler} style={{ display: 'inline-flex' }}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
      />
      <Button type='submit' variant='outline-success' className='p-0' style={{ marginLeft: 'auto' }}>
        Search
      </Button>
    </Form>
    ):(
      <Form onSubmit={vsubmitHandler} style={{ display: 'inline-flex' }}>
  <Form.Control
    type='text'
    name='q'
    onChange={(e) => setKeyword(e.target.value)}
    placeholder='Search Vendors...'
  />
  <Button type='submit' variant='outline-success' className='p-0' style={{ marginLeft: 'auto' }}>
    Search
  </Button>
</Form>
    )}
    </>

  )
}

export default SearchBox