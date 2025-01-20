import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";

function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState({ value: 0, unit: "minutes" });
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/authors?limit=all");
      const data = await response.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setAuthors([]);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const createBlogPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("readTime", JSON.stringify(readTime));
    formData.append("author", author);
    formData.append("content", content);

    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      const response = await fetch("http://localhost:3001/api/blogposts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Blog post added successfully!");
        window.location.href = "/blogposts";
      } else {
        const errorData = await response.json();
        alert(`Failed to add blog post: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Failed to add blog post.");
    }
  };

  return (
    <Container>
      <Row>
        <h1>Create New Blog Post</h1>
      </Row>
      <Form onSubmit={createBlogPost}>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="">Select an author</option>
            {Array.isArray(authors) &&
              authors.map((auth) => (
                <option key={auth._id} value={auth._id}>
                  {auth.nome} {auth.cognome}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Read Time</Form.Label>
          <Form.Control
            type="number"
            value={readTime.value}
            onChange={(e) =>
              setReadTime({
                ...readTime,
                value: parseInt(e.target.value, 10) || 0,
              })
            }
          />
          <Form.Select
            value={readTime.unit}
            onChange={(e) =>
              setReadTime({ ...readTime, unit: e.target.value })
            }
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Cover</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}

export default NewBlogPost;
