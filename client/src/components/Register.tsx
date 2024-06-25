import { FormEvent, useState } from "react";
import type { ModalProps } from "../types";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const Register = (props: ModalProps) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e?.preventDefault();
    try {
      setShowError(false);
      console.log(userInfo)
      await axios.post("/api/users/register", userInfo);
      props.onHide();
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="register-modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="register-modal-title">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
          <div className="mt-3">
            <label className="form-label" htmlFor="reg-name">
              Name
            </label>
            <input
              className="form-control"
              id="reg-name"
              name="name"
              type="name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              required
            />
          </div>
            <label className="form-label" htmlFor="reg-email">
              Email
            </label>
            <input
              className="form-control"
              id="reg-email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="reg-password">
              Password
            </label>
            <input
              className="form-control"
              id="reg-password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              required
            />
          </div>
          {showError && <div className="mt-3 text-danger">User already exists!</div>}
          <button className="btn btn-primary mt-3">Register</button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Register;
