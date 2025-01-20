import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function BlogPostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState({ value: 0, unit: "minutes" });
  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState([]); // Inizializza come array vuoto
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  
  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogposts/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setCategory(data.category);
      setReadTime(data.readTime);
      setAuthor(data.author._id);
      setContent(data.content);
    } catch (error) {
      console.error(error);
    }
  };

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
  
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogposts/${id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/blogposts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComment, author: newCommentAuthor }),
      });
  
      if (response.ok) {
        fetchComments(); // Aggiorna i commenti
        setNewComment("");
        setNewCommentAuthor("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/blogposts/${id}/comments/${commentId}`,
        { method: "DELETE" }
      );
  
      if (response.ok) {
        fetchComments(); // Aggiorna i commenti
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  const saveBlogPost = async (e) => {
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
      const response = await fetch(
        `http://localhost:3001/api/blogposts/${id}/with-cover`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setMessage("Blog post updated successfully!");
        setError("");
        setTitle(updatedPost.title);
        setCategory(updatedPost.category);
        setReadTime(updatedPost.readTime);
        setAuthor(updatedPost.author._id);
        setContent(updatedPost.content);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update blog post.");
      }
    } catch (err) {
      setError("An error occurred during update.");
    }
  };

  const deleteBlogPost = async () => {
    try {
      await fetch(`http://localhost:3001/api/blogposts/${id}`, {
        method: "DELETE",
      });
      navigate("/blogposts");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
    fetchAuthors();
    fetchComments(); // Fetch dei commenti
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Blog Post Details</h1>
        </Col>
      </Row>
      <Row>
        {/* Colonna dei dettagli del post */}
        <Col md={8}>
          <Form onSubmit={saveBlogPost}>
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
            <Button className="mt-3" type="submit">
              Save Changes
            </Button>
            <Button
              variant="danger"
              className="mt-3 ms-3"
              onClick={deleteBlogPost}
            >
              Delete
            </Button>
          </Form>
          {message && (
            <Alert variant="success" className="mt-3">
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
  
        {/* Colonna dei commenti */}
        <Col md={4}>
          <h2>Comments</h2>
          <Form onSubmit={addComment} className="mb-4">
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment"
              />
            </Form.Group>
            <Button className="mt-3" type="submit">
              Add Comment
            </Button>
          </Form>
  
          {/* Lista dei commenti */}
          <div>
            {comments.map((comment) => (
              <div key={comment._id} className="mb-3">
                <strong>{comment.author}</strong>: {comment.text}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-3"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
    }

export default BlogPostDetails;
