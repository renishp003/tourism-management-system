import {  Nav } from 'react-bootstrap';
import './dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
const Main = () => {
  const auth = localStorage.getItem('token')
  const navigate = useNavigate()
  const logOutAdmin = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
      <div className="vertical-nav bg-white" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="d-flex align-items-center">
            <div>
              <h4 className="m-0">Admin Pannel</h4>
            </div>
          </div>
        </div>
        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>
{
  auth ?
  <Nav className="flex-column bg-white mb-0">
    <Nav.Item>
      <Nav.Link as={Link} to='/main/manageUser' className="text-dark font-italic bg-light fa fa-th-large mr-3 text-primary fa-fw">
        Users
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to='/main/addPackages' className="text-dark font-italic">
        <i className="fa fa-address-card mr-3 text-primary fa-fw"></i> Add Packages
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to='/main/managePackgaes' className="text-dark font-italic">
        <i className="fa fa-address-card mr-3 text-primary fa-fw"></i> Manage Packages
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/main/bookings" className="text-dark font-italic">
        <i className="fa fa-cubes mr-3 text-primary fa-fw"></i> Bookings
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/main/manageContacts" className="text-dark font-italic">
        <i className="fa fa-cubes mr-3 text-primary fa-fw"></i> Contacts
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to='/login' onClick={logOutAdmin} className="text-dark font-italic">
        <i className="fa fa-picture-o mr-3 text-primary fa-fw" ></i> Logout
      </Nav.Link>
    </Nav.Item>
  </Nav>:
  <Nav>
    <Nav.Item>
      <Nav.Link as={Link} to='/login'  className="text-dark font-italic">
      </Nav.Link>
    </Nav.Item>
  </Nav>
}
      </div>
    </>
  );
};
export default Main;
