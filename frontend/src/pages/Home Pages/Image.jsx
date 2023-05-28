import React from 'react'
import background from '../../images/img.jpg'
import Search from '../../components/Search'
import '../../styles/Image.css'

const Image = () => {
  return (
    <div className="image-container" style={{
        backgroundImage: `url(${background})`,
         height: "577px", backgroundRepeat: "no-repeat", backgroundSize: "cover" 
      }}>
        <h1 style={{textAlign: 'center',paddingTop: "100px", fontSize: "50px"}}className="section__title">Welcome to Hunting Era</h1>
        <div className="search-container" style={{alignItems: 'center',paddingTop: "100px"}} ><Search/></div>
      
      </div>
  )
}

export default Image