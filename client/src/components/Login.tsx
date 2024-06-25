import { FormEvent, useState, useContext } from "react";
import type { ModalProps } from "../types";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = (props: ModalProps) => {
  const [ _, setUserData ] = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e?.preventDefault();
    try {
      setShowError(false);
      console.log(userInfo)
      const { data } = await axios.get(`/api/users/login?email=${userInfo.email}&password=${userInfo.password}`);
      if (setUserData) setUserData(data)
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
        <Modal.Title id="register-modal-title">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
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
          {showError && <div className="mt-3 text-danger">Invalid user credentials!</div>}
          <button className="btn btn-primary mt-3">Log In</button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Login;
