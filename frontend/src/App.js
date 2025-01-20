import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.component";
import Authors from "./pages/Authors.page";
import AuthorDetails from "./pages/AuthorDetails.page";
import NewAuthor from "./pages/NewAuthor.page";
import BlogPosts from "./pages/BlogPosts.page";
import BlogPostDetails from "./pages/BlogPostDetails.page";
import NewBlogPost from "./pages/NewBlogPost.page";

import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";


import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<div></div>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/new-authors" element={<NewAuthor />} />
        <Route path="/blogposts" element={<BlogPosts />} />
        <Route path="/blogposts/:id" element={<BlogPostDetails />} />
        <Route path="/new-blogpost" element={<NewBlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
