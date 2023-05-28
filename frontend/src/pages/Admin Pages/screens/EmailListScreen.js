import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { listEmails, deleteEmail } from '../../../actions/emailActions'
import { RiDeleteBinLine} from 'react-icons/ri';

const EmailListScreen = () => {
  const dispatch = useDispatch()
  const history= useNavigate()

  const emailList = useSelector((state) => state.emailList)
  const { loading, error, emails } = emailList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listEmails(''))
    } else {
      history(`/admin`)
    }
  }, [dispatch, history, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEmail(id))
    }
  }


  return (
    <div class="col main pt-5 mt-3">
    <>
      <h1>Emails</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {emails.map((email) => (
                    <tr key={email._id}>
                      <td>{email._id}</td>
                      <td>{email.email}</td>
                      <td><Button
                          variant='danger'
                          className='btn-sm d-flex justify-content-center'
                          onClick={() => deleteHandler(email._id)}
                        >
                          <i><RiDeleteBinLine/></i>
                        </Button></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </></div>
  )
}

export default EmailListScreen