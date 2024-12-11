// components/PackageList.js
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTourPackages } from '../../Redux/action/packageAction';
import { Card, Spinner, Alert, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './tourpackage.css'
import { bookTour } from '../../Redux/action/bookingAction';
import Swal from 'sweetalert2';
const TourPackage = () => {
    const dispatch = useDispatch();
    const { loading, tourPackages, error } = useSelector(state => state.tourPackages);
    const { loading: bookingLoading, error: bookingError, success: bookingSuccess } = useSelector(state => state.bookings);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [userDetails, setUserDetails] = useState({
        customerName: '',
        customerEmail: '',
        numberOfPeople: 1,
    });
    const handleCloseModal = () => {
        setShowModal(false);
        setUserDetails({
            customerName: '',
            customerEmail: '',
            numberOfPeople: 1,                                                                                                                                                                                                                                                                                                                                                                                                                    
        });
        setSelectedPackage(null);
    };

    const handleShowModal = (pkg) => {
        setSelectedPackage(pkg);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            tourPackage: selectedPackage._id,
            customerName: userDetails.customerName,
            customerEmail: userDetails.customerEmail,
            numberOfPeople: userDetails.numberOfPeople,
        };
        await dispatch(bookTour(bookingData));

        
        if (bookingSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Booking Successful!',
                text: 'Your tour package has been booked successfully.',
                confirmButtonText: 'OK'
            }).then(() => {
            });
            handleCloseModal(); 
        } else if (bookingError) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed!',
                text: bookingError,
                confirmButtonText: 'OK'
            });
        }
    };
    useEffect(() => {
        dispatch(fetchTourPackages());
    }, [dispatch]);

    return (
        <Container>
            <h2 className="my-4">Tour Packages</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
            {tourPackages?.length > 0 ? (
                    tourPackages.map((pkg) => (
                        <Col md={4} key={pkg._id} className="mb-4">
                            <Card>
                                <Card.Img
                                className='imgwidt'
                                    variant="top"
                                    src={`/assets/images/${pkg.image}`} // Update this path based on your folder structure
                                    alt={pkg.name}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300'; // Fallback image
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{pkg.name}</Card.Title>
                                    <Card.Text>
                                        {pkg.description.substring(0, 100)}... {/* Limit description length */}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Price:</strong> ${pkg.price}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Duration:</strong> {pkg.duration} days
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Max Capacity:</strong> {pkg.maxCapacity} people
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Start Date:</strong> {new Date(pkg.startDate).toLocaleDateString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>End Date:</strong> {new Date(pkg.endDate).toLocaleDateString()}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleShowModal(pkg)}>Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">No packages available.</Alert>
                    </Col>
                )}
            </Row>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Package: {selectedPackage?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="customerName"
                                value={userDetails.customerName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="customerEmail"
                                value={userDetails.customerEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicNumberOfPeople">
                            <Form.Label>Number of People</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of people"
                                name="numberOfPeople"
                                value={userDetails.numberOfPeople}
                                onChange={handleInputChange}
                                min="1"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={bookingLoading}>
                            {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default TourPackage;
