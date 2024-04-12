import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://six-unem.onrender.com/api/user/login", {
        userName: user,
        password
      });
  
      console.log("Login response:", response);
  
      if (response.status === 200) {
        router.push("/favourites");
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      setWarning(err.message);
    }
  }
  

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
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

        {warning && (
          <>
            <br />
            <Alert variant='danger'>{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  );
}
