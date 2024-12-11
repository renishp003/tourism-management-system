import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTourPackage, fetchTourPackages, updateTourPackage } from '../../Redux/action/packageAction';
import { Spinner, Alert, Container, Table, Button, Modal, Form } from 'react-bootstrap';
import Main from './Main';
import Swal from 'sweetalert2';
const ManageTourPackages = () => {
    const dispatch = useDispatch();
    const { loading, tourPackages, error } = useSelector(state => state.tourPackages);
    const [showModal, setShowModal] = useState(false);
    const [currentPackage, setCurrentPackage] = useState({});
    useEffect(() => {
        dispatch(fetchTourPackages());
    }, [dispatch,tourPackages]);
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTourPackage(id));
                Swal.fire(
                    'Deleted!',
                    'Your package has been deleted.',
                    'success'
                );
            }
        });
    };
    const handleUpdate = (pkg) => {
        setCurrentPackage(pkg);
        setShowModal(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTourPackage(currentPackage._id, currentPackage));
        setShowModal(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPackage(prevState => ({ ...prevState, [name]: value }));
    };
    return (
        <>
        <Main/>
        <Container className='frmcenter' style={{marginLeft:"210px"}}>
            <h2 className="my-4">Tour Packages</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {tourPackages?.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th>Max Capacity</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourPackages.map((pkg) => (
                            <tr key={pkg._id}>
                                <td>
                                    <img
                                        src={`/assets/images/${pkg.image}`} 
                                        alt={pkg.name}
                                        className="img-thumbnail"
                                        style={{ width: '100px', height: 'auto' }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100'; 
                                        }}
                                    />
                                </td>
                                <td>{pkg.name}</td>
                                <td>{pkg.description.substring(0, 50)}...</td> 
                                <td>${pkg.price}</td>
                                <td>{pkg.duration} days</td>
                                <td>{pkg.maxCapacity} people</td>
                                <td>{new Date(pkg.startDate).toLocaleDateString()}</td>
                                <td>{new Date(pkg.endDate).toLocaleDateString()}</td>
                                <td>
                                    <Button variant='danger' className='me-2' onClick={() => handleUpdate(pkg)}>Update</Button>
                                    <Button variant="primary" onClick={() => handleDelete(pkg._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No packages available.</Alert>
            )}
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentPackage.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={currentPackage.description || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={currentPackage.price || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={currentPackage.duration || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicMaxCapacity">
                            <Form.Label>Max Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxCapacity"
                                value={currentPackage.maxCapacity || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={currentPackage.startDate ? new Date(currentPackage.startDate).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={currentPackage.endDate ? new Date(currentPackage.endDate).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Package</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default ManageTourPackages;
