import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function AuthorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [data_di_nascita, setDataDiNascita] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/authors/${id}`);
      const data = await response.json();
      setNome(data.nome);
      setCognome(data.cognome);
      setEmail(data.email);
      setDataDiNascita(data.data_di_nascita);
    } catch (error) {
      console.error(error);
    }
  };

  const putAuthor = async () => {
    try {
      await fetch(`http://localhost:3001/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cognome, email, data_di_nascita }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAuthor = async () => {
    try {
      await fetch(`http://localhost:3001/api/authors/${id}`, { method: "DELETE" });
      navigate("/authors");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(`http://localhost:3001/api/authors/${id}/avatar`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        setMessage("Avatar uploaded successfully!");
        setError("");
        fetchAuthor(); // Ricarica i dati aggiornati
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to upload avatar.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred during upload.");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Author Details</h1>
        </Col>
      </Row>
      <Form>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cognome</Form.Label>
          <Form.Control value={cognome} onChange={(e) => setCognome(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data di nascita</Form.Label>
          <Form.Control value={data_di_nascita} onChange={(e) => setDataDiNascita(e.target.value)} />
        </Form.Group>
        <Button onClick={putAuthor}>Save</Button>
        <Button variant="danger" onClick={deleteAuthor}>Delete</Button>
      </Form>

      <Form onSubmit={uploadAvatar}>
        <Form.Group>
          <Form.Label>Select Avatar</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </Form.Group>
        <Button className="mt-3" type="submit">Upload</Button>
      </Form>
      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
}

export default AuthorDetails;
