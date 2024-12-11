import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import './login.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUserr } from "../../Redux/action/userAction"
const Loginp = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) => {
    loginUser[e.target.name] = e.target.value;
    setLoginUser({ ...loginUser });
    console.log(loginUser);
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !(
        loginUser.email &&
        loginUser.password  
      )
    ) {
      return false;
    }
    dispatch(loginUserr(loginUser,navigate));
  };
  return (
    <>
     <Container fluid className="p-0">
        <div className="bgimglogin">
          <Container className="d-flex justify-content-center align-items-center">
            <Row className="rowsize">
              <Col sm={12} md={6} lg={6} xl={6} className="p-0"><div className="formsection">
                <h3 className="mt-4 mb-2">SIGNIN</h3>
                <p className="text-muted mb-4">WelCome Back To Expore World!</p>
                <Form onSubmit={handleAddUser}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange}/>
      </Form.Group>
      <Button  type="submit" className="my-3 formbtn">
      SIGNIN
      </Button>
    </Form>
    <p className="my-3">Already Have An Account?  <Link to="/registration"  className="linktg">SignUp</Link> </p>
    </div></Col>
              <Col sm={12} md={6} lg={6} xl={6} className="p-0"><div className="rightimglogin"></div></Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  )
}
export default Loginp
