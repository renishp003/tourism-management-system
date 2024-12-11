import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchContacts } from '../../Redux/action/conatactAction';
import Main from './Main';

const ManageContact = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <Main/>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h2>Contact List</h2>
      <Table  style={{width:"300px"}}  striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default ManageContact;
