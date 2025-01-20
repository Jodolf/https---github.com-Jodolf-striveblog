import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import AuthorCard from "../components/AuthorCard/AuthorCard.component";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/authors?page=${page}`);
      const data = await response.json();
      setAuthors(data.authors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [page]);

  return (
    <Container>
      <Row>
        <h1>Authors</h1>
      </Row>
      <Row>
        {authors.map(author => <AuthorCard key={author._id} {...author} />)}
      </Row>
      <Row className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </Row>
    </Container>
  );
}

export default Authors;
