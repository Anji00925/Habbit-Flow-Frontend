import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      setSuccessMsg('Registration successful! Redirecting to Sign In...');
      setTimeout(() => navigate('/Dashboard'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="p-4 shadow rounded bg-light">
          <h3 className="mb-4 text-primary text-center">Sign Up</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group controlId="signupEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="signupPassword" className="mb-3">
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

            <Form.Group controlId="signupConfirmPassword" className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
