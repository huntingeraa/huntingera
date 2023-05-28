import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listUsers, deleteUser } from '../../../actions/userActions'
import { RiCheckLine, RiCloseLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const UserListScreen = () => {

  const dispatch = useDispatch()
  const history = useNavigate()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history(`/admin`)
    }
  }, [dispatch, history, successDelete, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <>
      <h1>Users</h1>
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
                  <th>SIMPLE USER</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user ? (
                        <i style={{ color: 'green' }}><RiCheckLine/></i>
                      ) : (
                          <i style={{ color: 'red' }}><RiCloseLine/></i>
                        )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i><RiEdit2Line/></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
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

export default UserListScreen