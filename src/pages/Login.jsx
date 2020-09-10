import React, { useState } from "react";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";


const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const error = props.errorLogin;
  // state = { username: "", password: "" };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    props.login(userName, password);
    // this.props.login method is coming from the AuthProvider
    // injected by the withAuth() HOC
    setUserName("");
    setPassword("");
  };

  return (
    <div className="LoginPage" >
      <div className="LoginForm" onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          color="black"
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <h4>{error}</h4> : null}
        <button type="submit" value="Login" onClick={handleFormSubmit}>Login</button>
       
      </div>
      <p>
        {" "}
        Don't have account yet? <Link to={"/signup"}>Signup</Link>
      </p>
    </div>
  );
};

export default withAuth(Login);
