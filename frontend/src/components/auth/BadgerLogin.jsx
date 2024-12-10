import { useRef, useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginState } from '../contexts/LoginContext';
import { ArrowLeft } from 'react-bootstrap-icons';


export default function BadgerLogin() {

  // TODO Create the login component.
  const { user, setUser, login, setLogin } = useLoginState();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
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

  useEffect(() => {
    if (login) {
        fetch('http://localhost:8080/user/isAdmin', {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((isAdmin) => {
                console.log("Admin status:", isAdmin);
                localStorage.setItem("isAdmin", isAdmin);
                setUser((prevUser) => ({ ...prevUser, isAdmin }));
            })
            .catch((err) => {
                console.error("Error checking admin status:", err);
                localStorage.setItem("isAdmin", false);
                setUser((prevUser) => ({ ...prevUser, isAdmin: false }));
            });
    }
  }, [login, setUser]);


  // create routeChange function to redirect to home
  const routeChange = () => {
    let path = '../';
    navigate(path);
  }

  function handleLogin(e) {
    e.preventDefault();

    if (usernameInput.current.value === "" || passwordInput.current.value === "") {
      alert("You must provide both a username and password!");
      return;
    }

    setLoading(true);
    setError(null);

    fetch('http://localhost:8080/user/login', {
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
        if (res.status === 401) {
          alert("Error: Incorrect email or password, please try again.");
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
          alert("Your login is successful");

          setLogin(true);
          setUser(usernameInput.current.value);

          localStorage.setItem("isLoggedIn", JSON.stringify(usernameInput.current.value));
          console.log("Storing username:", usernameInput.current.value);

          navigate('/');
        }
      })
      .catch(() => {
        setError("Login failed, please try again later.");
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
            variant='outline-info'
            onClick={routeChange}
            style={{ top: '5vh', left: '5vw', borderRadius: '50%', height: '3rem', width: '3rem', position: 'fixed' }}
          >
            <ArrowLeft />
          </Button>
        </Col>
        <Col sm='10' className="d-flex justify-content-center" style={{ marginTop: '2rem' }}></Col>
      </Row>
      <div style={styles.pageContainer}>
        <Card style={styles.card}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="userName" style={styles.formGroup}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  ref={usernameInput}
                  isInvalid={usernameInput.current && !usernameInput.current.value}
                  style={{ padding: '10px', borderRadius: '5px' }}
                  placeholder="Enter your username"
                />
              </Form.Group>

              <Form.Group controlId="password" style={styles.formGroup}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
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
                  'Login'
                )}
              </Button>
            </Form>
            {error && <p className="text-danger mt-3">{error}</p>}
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
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
  },
};
