import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listVendorcreations, deleteVendorcreationA } from '../../../actions/vendorcreationActions'
import { VENDORCREATION_CREATE_RESET } from '../../../constants/vendorcreationConstants'
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const VendorcreationListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const vendorcreationList = useSelector((state) => state.vendorcreationList)
  const { loading, error, vendorcreations } = vendorcreationList

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

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    dispatch({ type: VENDORCREATION_CREATE_RESET })

    if (!adminInfo || !adminInfo.isAdmin) {
      history(`/admin`)
    } if (successCreate) {
      history(`/admin/vendorcreation/${createdVendorcreation._id}/edit`)
    } else {
      dispatch(listVendorcreations(''))
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
    successCreate,
    createdVendorcreation
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteVendorcreationA(id))
    }
  }
  return (
    <div class="col main pt-5 mt-3">
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Vendor Profiles</h1>
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
                    <th>EMAIL</th>
                    <th>CONTACT</th>
                    <th>LOCATION</th>
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
                      <td>{vendorcreation.email}</td>
                      <td>{vendorcreation.cnt}</td>
                      <td>{vendorcreation.location}</td>
                      <td>
                        <LinkContainer to={`/admin/vendorcreation/${vendorcreation._id}/edit`}>
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

export default VendorcreationListScreen