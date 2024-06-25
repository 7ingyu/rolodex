import { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Register } from "./index";
import { UserContext } from "../context/UserContext";

const Navigation = () => {
  const [showReg, setShowReg] = useState(false);
  // const [ openLogin, setOpenLogin ] = useState(false);
  const [userData, setUserData] = useContext(UserContext);

  const handleLogout = () => {
    console.log("logout");
    if (setUserData)
      setUserData({
        id: 0,
        name: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      });
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userData.id ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link>
                    <button
                      className="btn btn-link"
                      onClick={() => setShowReg(true)}
                    >
                      Register
                    </button>
                  </Nav.Link>
                  <Nav.Link href="#link">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Register onHide={() => setShowReg(false)} show={showReg} />
    </>
  );
};

export default Navigation;
