import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../styles/Image.css'

const SearchBox = ({ history}) => {

  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }
  const handleChange = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/${keyword}`);
    } else {
      history.push('/');
    }
  }
  
  return (
    <Form  inline onSubmit={handleChange}>
      <Form.Control
       type='text'
       name='q'
       placeholder='Search Product Trends...'
       value={keyword}
       onChange={handleInputChange}
      ></Form.Control>
      <div className='search_button' style={{alignItems: 'center',paddingTop: "10px"}}>
      <Link to={`/${keyword}`}>
      <Button type='submit' variant='outline-primary' className='p-2'>
        Search
      </Button>
      </Link></div>
      
    </Form>
  )
}

export default SearchBox