import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTourPackage } from '../../Redux/action/packageAction';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import Main from './Main'
import './dashboard.css';
const AddPackage = () => {
  const initialFormState = {
    name: '',
    description: '',
    price: '',
    duration: '',
    destinations: '',
    maxCapacity: '',
    startDate: '',
    endDate: '',
    image: null
};
const [formData, setFormData] = useState(initialFormState);
const dispatch = useDispatch();
const { loading, error, successMessage } = useSelector((state) => state.tourPackages || {});
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
};
const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('duration', formData.duration);
    data.append('maxCapacity', formData.maxCapacity);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    if (formData.image) {
        data.append('image', formData.image);
    }
    dispatch(addTourPackage(data));
};
useEffect(() => {
  if (successMessage) {
      setFormData(initialFormState);
  }
}, [successMessage]);
  return (
    <>
    <Main/>
    <Container  className='frmcenter'>
            <h2 className="">Add Tour Package</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit} className='frmcss'>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.Label>Duration (days)</Form.Label>
                    <Form.Control
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="maxCapacity">
                    <Form.Label>Max Capacity</Form.Label>
                    <Form.Control
                        type="number"
                        name="maxCapacity"
                        value={formData.maxCapacity}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Add Package
                </Button>
            </Form>
        </Container>
    </>
  )
}
export default AddPackage