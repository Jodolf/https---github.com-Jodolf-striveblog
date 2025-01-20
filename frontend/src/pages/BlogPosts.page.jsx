
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.component";

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/blogposts?page=${page}&title=${search}`
      );
      const data = await response.json();
      setBlogPosts(data.blogPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [page, search]);

  return (
    <Container>
      <Row>
        <h1>Blog Posts</h1>
      </Row>
      <Row>
        <input
          type="text"
          placeholder="Search blog posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => fetchBlogPosts()}>Search</button>
      </Row>
      <Row>
        {blogPosts.map((blogPost) => (
          <BlogPostCard key={blogPost._id} {...blogPost} />
        ))}
      </Row>
      <Row className="pagination-controls">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button>
      </Row>
      <Row>
        <button onClick={fetchBlogPosts}>Refresh</button>
      </Row>
    </Container>
  );
}

export default BlogPosts;
