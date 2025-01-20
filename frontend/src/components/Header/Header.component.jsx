import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">StriveBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
            <Nav.Link as={Link} to="/new-authors">Add New Author</Nav.Link>
            <Nav.Link as={Link} to="/blogposts">Blog Posts</Nav.Link>
            <Nav.Link as={Link} to="/new-blogpost">Add New Blog Post</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
