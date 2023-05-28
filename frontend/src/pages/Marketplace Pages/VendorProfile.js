import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyVendorcreations, deleteVendorcreation } from '../../actions/vendorcreationActions'
import { VENDORCREATION_CREATE_RESET } from '../../constants/vendorcreationConstants'

const VendorProfile = () => {
  const history=useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch()

  const vendorcreationListMy = useSelector((state) => state.vendorcreationListMy)
  const { loading, error, vendorcreations } = vendorcreationListMy

  const vendorcreationDelete = useSelector((state) => state.vendorcreationDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = vendorcreationDelete

  const vendorcreationCreate = useSelector((state) => state.vendorcreationCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    vendorcreation: createdVendorcreation,
  } = vendorcreationCreate

  const vendorLogin = useSelector((state) => state.vendorLogin)
  const { vendorInfo } = vendorLogin

  useEffect(() => {
    dispatch({ type: VENDORCREATION_CREATE_RESET })

    if (!vendorInfo || !vendorInfo.isAdmin) {
      history(`/vlogin`)
    }  else {
      dispatch(listMyVendorcreations(''))
    }
  }, [
    dispatch,
    history,
    vendorInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteVendorcreation(id))
    }
  }

  const createVendorcreationHandler = () => {
    history(`/store/vendorcreation/vendoradd`)
  }

  return (
    <div className='othermain'>
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>My Vendor Profile</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createVendorcreationHandler}>
            <i className='fas fa-plus'></i> Create Profile
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>CATEGORY</th>
                    <th>LOCATION</th>
                    <th>EMAIL</th>
                    <th>CONTACT NO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {vendorcreations.map((vendorcreation) => (
                    <tr key={vendorcreation._id}>
                      <td>{vendorcreation._id}</td>
                      <td>{vendorcreation.name}</td>
                      <td>{vendorcreation.description}</td>
                      <td>{vendorcreation.category}</td>
                      <td>{vendorcreation.location}</td>
                      <td>{vendorcreation.email}</td>
                      <td>{vendorcreation.cnt}</td>
                      <td>
                        <LinkContainer to={`/store/myvendor/${vendorcreation._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                          <i><RiEdit2Line/></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(vendorcreation._id)}
                        >
                          <i><RiDeleteBinLine/></i>
                        </Button>
              
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}<br/><br/><br/><br/>
    </></div>
  )
}

export default VendorProfile 