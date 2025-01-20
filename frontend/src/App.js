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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.component";


import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<ProtectedRoute><div></div></ProtectedRoute>} />
        <Route path="/authors" element={<ProtectedRoute><Authors /></ProtectedRoute>} />
        <Route path="/authors/:id" element={<ProtectedRoute><AuthorDetails /></ProtectedRoute>} />
        <Route path="/new-authors" element={<ProtectedRoute><NewAuthor /></ProtectedRoute>} />
        <Route path="/blogposts" element={<ProtectedRoute><BlogPosts /></ProtectedRoute>} />
        <Route path="/blogposts/:id" element={<ProtectedRoute><BlogPostDetails /></ProtectedRoute>} />
        <Route path="/new-blogpost" element={<ProtectedRoute><NewBlogPost /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
