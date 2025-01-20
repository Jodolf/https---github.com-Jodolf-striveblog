import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AuthorCard.style.css";

function AuthorCard({ _id, nome, cognome, data_di_nascita, email, avatar }) {
  return (
    <Col xs={12} md={6} lg={4}>
      <Link to={`/authors/${_id}`} className="author-card">
        <Card>
          {avatar && <Card.Img variant="top" src={avatar} />} {/* Visualizza avatar */}
          <Card.Body>
            <Card.Title>{nome} {cognome}</Card.Title>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Born: {data_di_nascita}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default AuthorCard;
