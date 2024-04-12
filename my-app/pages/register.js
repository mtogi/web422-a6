import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://six-unem.onrender.com/api/user/register", {
        user,
        password,
        password2
      }, {
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
          'Accept': 'application/json' // Specify JSON accept type
        }
      });

      if (response.status === 200) {
        router.push("/login");
      } else {
        setWarning("Registration failed. Please try again.");
      }
    } catch (err) {
      setWarning("Registration failed. Please try again.");
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Register for an account:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant='danger'>
              {warning}
            </Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
}
