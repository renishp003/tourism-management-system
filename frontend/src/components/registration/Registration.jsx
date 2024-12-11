import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addUSer } from "../../Redux/action/userAction";

const Registration = () => {
  const [validation, setValidation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  
  const handleChange = (e) => {
    userData[e.target.name] = e.target.value;
    setUserData({ ...userData });
    console.log(userData);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !(
        userData.email &&
        userData.firstname&&
        userData.lastname &&
        userData.mobile &&
        userData.password 
       
       
        
      )
    ) {
      setValidation(true);

      return false;
    }
   
    dispatch(addUSer(userData));
    navigate('/login')
    
  };
  return (
    <>
      <Container fluid className="p-0">
        <div className="bgimg">
          <Container className="d-flex justify-content-center align-items-center">
            <Row className="rowsize">
              <Col sm={12} md={6} lg={6} xl={6} className="p-0">
                <div className="formsection">
                  <h3 className="mt-4 mb-2">SIGNUP</h3>
                  <p className="text-muted mb-4">WelCome To Expore World!</p>
                  <Form onSubmit={handleAddUser}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                       
                        name="email"
                        
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                      {validation && !userData.email && (
                        <span className="errormsg">Please Enter the Email</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupfirstname">
                      <Form.Label>Firstname</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                      
                        onChange={handleChange}
                        placeholder="Enter Firstname"
                      />
                      {validation && !userData.firstname && (
                        <span className="errormsg">Please Enter the firstname</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGrouplastname">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        placeholder="Enter Lastname"
                      />
                      {validation && !userData.lastname && (
                        <span className="errormsg">Please Enter the Lastname</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupmobile">
                      <Form.Label>Mobile No.</Form.Label>
                      <Form.Control
                        type="number"
                        name="mobile"
                       
                        onChange={handleChange}
                        placeholder="Enter MobileNo"
                      />
                       {validation && !userData.mobile && (
                        <span className="errormsg">Please Enter the Mobile</span>
                      )}
                      {/* {mobileValidation && userData.mobile && (<span className='errormsg'>Mobile Number Must be 10 Digits</span>)} */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        
                        onChange={handleChange}
                        placeholder="Password"
                      />
                       {validation && !userData.password && (
                        <span className="errormsg">Please Enter the Password</span>
                      )}
                    </Form.Group>
                    <Button
                      type="submit"
                      
                      className="my-3 formbtn"
                    >
                     Submit
                    </Button>
                  </Form>
                  <p className="my-3">
                    Already Have An Account?{" "}
                    <Link to="/login" className="linktg">
                      SignIn
                    </Link>{" "}
                  </p>
                </div>
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className="p-0">
                <div className="rightimgregi"></div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Registration;
