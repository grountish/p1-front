import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import styled from "styled-components";

const SignupPage = styled.div`
  display: flex;
  font-family: courier;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  letter-spacing: 2px;
  color: white;

  p {
    margin-top: 5%;
    margin-bottom: 6%;
  }

  a:link {
    text-decoration: none;
    color: black;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }
  a:hover,
  a:active {
    text-decoration: none;
    color: black;
  }
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 8%;
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

const SignupInput = styled.input`
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
  :hover {
    background-color: white;
    color: black;
  }
`;

class Signup extends Component {
  state = { username: "", email: "", password: "", error:null };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;
    if (!username || !email || !password) {
     this.errorHandler("Por Favor, introduce todos los campos")
      return;
    }
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
      this.errorHandler("La contraseña debe contener una mayuscula, un número y un caracter especial")
      return;
    }

    this.props.signup(username, email, password);
    // this.props.signup method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };
  errorHandler = (message) => {
    this.setState({error:message})
    setTimeout(() => {
      this.setState({error:null})
      
    }, 4000);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <SignupPage>
        <SignupForm onSubmit={this.handleFormSubmit}>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <h4>{this.state.error} </h4>
          <SignupInput type="submit" value="Signup" />
        </SignupForm>

        <p>
          {" "}
          Already have account?<Link to={"/login"}> Login</Link>
        </p>
      </SignupPage>
    );
  }
}

export default withAuth(Signup);
