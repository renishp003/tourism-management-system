import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner, Alert, Container } from 'react-bootstrap';
import { fetchAllBookings } from '../../Redux/action/bookingAction';
import Main from './Main';
const Bookings = () => {
    const dispatch = useDispatch();
    let role = localStorage.getItem('role')
    console.log(role)
    const { loading, bookings, error } = useSelector(state => state.bookings);

    useEffect(() => {
        dispatch(fetchAllBookings());
    }, [dispatch]);
    
    return (
      <>
      {
             role ==="admin" ?<Main/>:""
      }
        <Container className='frmcenter'>
            <h2 className="my-4">All Bookings</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        {/* <th>Package Name</th> */}
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>People</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            {/* <td>{booking.tourPackage.name}</td> */}
                            <td>{booking.customerName}</td>
                            <td>{booking.customerEmail}</td>
                            <td>{booking.numberOfPeople}</td>
                            <td>${booking.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
};
export default Bookings;
