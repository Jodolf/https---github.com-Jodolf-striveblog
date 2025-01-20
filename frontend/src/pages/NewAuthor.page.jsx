import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { data } from "react-router";

import "./NewAuthor.style.css";

function NewAuthor() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAuthor = {
      nome: e.target.formNome.value,
      cognome: e.target.formCognome.value,
      email: e.target.formEmail.value,
      data_di_nascita: e.target.formNascita.value,
    };
  
    const response = await fetch("http://localhost:3001/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAuthor),
    });
  
    if (response.ok) {
      // Redirect to authors page
      window.location.href = "/authors";
    } else {
      alert("Failed to add author.");
    }
  };
  
  return (
    <Container>
        <Row><h1>Aggiungine n'altro</h1></Row>
        <Row>
          
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Enter nome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCognome">
        <Form.Label>Cognome</Form.Label>
        <Form.Control type="text" placeholder="Enter cognome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formNascita">
        <Form.Label>Data di nascita</Form.Label>
        <Form.Control type="text" placeholder="Enter data di nascita" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Row>
    </Container>
  );
}

export default NewAuthor;
