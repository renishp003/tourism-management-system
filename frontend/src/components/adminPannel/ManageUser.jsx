// components/UserList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../Redux/action/userAction';
import { Table, Spinner, Alert, Container, Button } from 'react-bootstrap';
import Main from './Main';
import Swal from 'sweetalert2';
const ManageUser = () => {
    const dispatch = useDispatch();
    const {users,loading,error}=useSelector(state=>state.user)
console.log(users)
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleDelete = (userId) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              dispatch(deleteUser(userId));
              Swal.fire(
                  'Deleted!',
                  'The user has been deleted.',
                  'success'
              );
          }
      });
  };
    return (
      <>
      <Main/>
        <Container className='frmcenter'>
            <h2 className="">User List</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td><Button variant="primary" onClick={() => handleDelete(user._id)}>Delete</Button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
        </>
    );
};
export default ManageUser;
