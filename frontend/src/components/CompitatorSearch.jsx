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
      history.push(`/${keyword}/competitors`);
    } else {
      history.push('/competitors');
    }
  }
  
  return (
    <Form  inline onSubmit={handleChange}>
      <Form.Control
       type='text'
       name='q'
       placeholder='Search Product Compitators...'
       value={keyword}
       onChange={handleInputChange}
      ></Form.Control>
      <div className='search_button' style={{alignItems: 'center',paddingTop: "10px"}}>
      <Link to={`/${keyword}/competitors`}>
      <Button type='submit' variant='primary' className='p-2'>
        Search
      </Button>
      </Link></div>
      
    </Form>
  )
}

export default SearchBox