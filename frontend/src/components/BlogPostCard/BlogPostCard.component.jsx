import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
//import "./BlogPostCard.style.css";

function BlogPostCard({ _id, title, category, readTime, author, cover }) {
  return (
    <Col xs={12} md={6} lg={4}>
      <Link to={`/blogposts/${_id}`} className="blogpost-card">
        <Card>
          {cover && <Card.Img variant="top" src={cover} />}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>Category: {category}</Card.Text>
            {/*<Card.Text>Read Time: {readTime.value} {readTime.unit}</Card.Text>*/}
            <Card.Text>Author: {author?.nome} {author?.cognome}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default BlogPostCard;
