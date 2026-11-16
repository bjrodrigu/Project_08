import { useRef, useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';
import { API_BASE } from "../../api";
import { useNotify } from '../contexts/ToastContext';


export default function BadgerLogin() {

  // TODO Create the login component.
  const { user, setUser, login, setLogin } = useLoginState();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const notify = useNotify();
  // check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = Number(localStorage.getItem("tokenExpiration"));
    const currentTime = Date.now();



    if (token && tokenExpiration && currentTime < tokenExpiration) {

      setLogin(true);
      console.log("username: ",)
      const username = JSON.parse(localStorage.getItem("isLoggedIn") || '"User"');
      setUser(username);
      setRedirecting(true); // set redirecting status
      navigate('/');
    } else {
      //expired.
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("isLoggedIn");
    }
  }, [navigate, setLogin, setUser]);


  // create routeChange function to redirect to home
  const routeChange = () => {
    let path = '../';
    navigate(path);
  }

  function handleLogin(e) {
    e.preventDefault();

    if (usernameInput.current.value === "" || passwordInput.current.value === "") {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: usernameInput.current.value,
        password: passwordInput.current.value
      })
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          setError("That email and password don't match. Try again.");
        } else if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unexpected response status: " + res.status);
        }
      })
      .then(data => {
        if (data && data.token && data.expiresIn) {
          //get expiration time


          const expirationTime = Date.now() + data.expiresIn;
          localStorage.setItem("tokenExpiration", expirationTime);


          localStorage.setItem("token", data.token);



          notify("Logged in");
          setLogin(true);
          setUser(usernameInput.current.value);
          localStorage.setItem("isLoggedIn", JSON.stringify(usernameInput.current.value));
          console.log("Storing username:", usernameInput.current.value);
          navigate('/');
        }
      })
      .catch(() => {
        setError("Couldn't reach the server. Check that the backend is running and try again.");
      })
      .finally(() => {
        setLoading(false);
      });

  }

  if (redirecting) {
    return null;
  }

  return (
    <>
      <Row style={{ width: '85vw', marginBottom: '2rem' }}>
        <Col sm='2'>
          <Button
            variant='outline-secondary' aria-label="Back"
            onClick={routeChange}
            className="page-back-button" style={{ top: '5vh', left: '5vw', borderRadius: '50%', height: '3rem', width: '3rem', position: 'fixed' }}
          >
            <ArrowLeft />
          </Button>
        </Col>
        <Col sm='10' className="d-flex justify-content-center" style={{ marginTop: '2rem' }}></Col>
      </Row>
      <div style={styles.pageContainer}>
        <Card style={styles.card}>
          <Card.Body>
            <h1 className="text-center mb-4" style={{ fontSize: '1.75rem' }}>Log in</h1>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="userName" style={styles.formGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="email"
                  ref={usernameInput}
                  isInvalid={usernameInput.current && !usernameInput.current.value}
                  style={{ padding: '10px', borderRadius: '5px' }}
                  placeholder="you@example.com"
                />
              </Form.Group>

              <Form.Group controlId="password" style={styles.formGroup}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  ref={passwordInput}
                  isInvalid={passwordInput.current && !passwordInput.current.value}
                  style={{ padding: '10px', borderRadius: '5px' }}
                  placeholder="Enter your password"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                style={styles.button}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Logging in
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </Form>
            {error && <p className="form-error" role="alert">{error}</p>}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
  },
};
