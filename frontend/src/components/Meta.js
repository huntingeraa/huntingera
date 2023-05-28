import React from 'react'
import Helmet from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Hunting era',
  description: 'We help you to select Product and its Vendors',
  keywords: 'select Vendors and choose now!!'
}

export default Meta
