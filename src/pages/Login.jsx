import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginPage = styled.div`
  display: flex;
  font-family: courier;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  letter-spacing:2px;
  color: white;

  p {
    margin-top: 8%;
  }

  a:link {
    text-decoration: none;
    color: black;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 10%;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 400;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const Input = styled.input`
  font-family: courier;
  margin: 0.7rem;
  background: none;
  font-size: 1em;
  padding: 1em 6em;
  text-align: center;
  color: yellow;
  border: none;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const LoginInput = styled.input`
  font-family: courier;
  background: none;
  font-size: 1rem;
  color: yellow;
  border: 2px solid white;
  align-items: center;
  justify-items: center;
  text-align: center;
  margin-top: 2.5rem;
  border-radius: 5%;
  width: 8rem;
  height: 3rem;
  cursor: pointer;
  :hover{
    background-color: white;
    color: black;
  }
`;

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
    // this.props.login method is coming from the AuthProvider
    // injected by the withAuth() HOC
    this.setState({username: "", password: ""})
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    const error = this.props.errorLogin
   
    return (
      <LoginPage>

        <LoginForm onSubmit={this.handleFormSubmit}>
          <Label>Username:</Label>
          <Input
            color="black"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        {
          error
          ? <h4>{error}</h4>
          : null
        }
          <LoginInput type="submit" value="Login" />
        </LoginForm>
        <p>
          {" "}
          Don't have account yet? <Link to={"/signup"}>Signup</Link>
        </p>
      </LoginPage>
    );
  }
}

export default withAuth(Login);