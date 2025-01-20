import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Se l'utente è già autenticato, reindirizza alla homepage
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const birthdate = e.target.birthdate.value;
  
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nome: name,
          cognome: surname,
          data_di_nascita: birthdate,
        }),
      });
  
      if (response.ok) {
        alert("Registration successful. You can now log in.");
        navigate("/login");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };
    
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="surname" type="text" placeholder="Surname" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <input name="birthdate" type="date" placeholder="Date of Birth" required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
