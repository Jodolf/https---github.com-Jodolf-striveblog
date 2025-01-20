import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nome: name, cognome: surname }),
      });

      if (response.ok) {
        alert("Registration successful");
        window.location.href = "/login";
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
