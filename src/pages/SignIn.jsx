import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useContext(AuthContext);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

  console.log("Sending email:", email);
  console.log("Sending password:", password);


    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log("Login response:", res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      setToken(res.data.token);

      // setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5} className="p-4 shadow rounded bg-light">
          <h3 className="mb-4 text-primary text-center">Sign In</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signinEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="signinPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
