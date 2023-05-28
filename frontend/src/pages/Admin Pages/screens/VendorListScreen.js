import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listVendors, deleteVendor } from '../../../actions/vendorActions'
import { RiCheckLine, RiCloseLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const VendorListScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const vendorList = useSelector((state) => state.vendorList)
  const { loading, error, vendors } = vendorList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const vendorDelete = useSelector((state) => state.vendorDelete)
  const { success: successDelete } = vendorDelete

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listVendors())
    } else {
      history(`/admin`)
    }
  }, [dispatch, history, successDelete, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteVendor(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <>
      <h1>Vendors</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>VENDOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td>{vendor._id}</td>
                    <td>{vendor.name}</td>
                    <td>
                      <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
                    </td>
                    <td>
                      {vendor ? (
                        <i style={{ color: 'green' }}><RiCheckLine/></i>
                        ) : (
                            <i style={{ color: 'red' }}><RiCloseLine/></i>
                        )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/vendor/${vendor._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                        <i><RiEdit2Line/></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(vendor._id)}
                      >
                         <i><RiDeleteBinLine/></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </></div>
  )
}

export default VendorListScreen