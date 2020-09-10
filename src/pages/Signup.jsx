import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!userName || !email || !password) {
      errorHandler("Por Favor, introduce todos los campos");
      return;
    }
    if (
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ) {
      errorHandler(
        "La contraseña debe contener una mayuscula, un número y un caracter especial"
      );
      return;
    }

    props.signup(userName, email, password);
    // props.signup method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };
  const errorHandler = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  return (
    <div className="SignupPage">
      <div className="SignupForm" onSubmit={handleFormSubmit}>
        <label >Username:</label>
        <input
          
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label >Email:</label>
        <input
          
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label >Password:</label>
        <input
          
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h4>{error} </h4>
        <button
         
          onClick={handleFormSubmit}
          type="submit"
          value="Signup"
        >
          Sign Up
        </button>
      </div>

      <p>
        {" "}
        Already have account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};

export default withAuth(Signup);
