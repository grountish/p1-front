import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../lib/Auth";
import styled from "styled-components";

const EditPage = styled.div`
  font-family: courier;
  letter-spacing:2px;
  color: white;
`;

const EditForm = styled.form`
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .form-control {
    border-bottom: 1px solid black;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 1%;
`;

const Input = styled.input`
  font-family: courier;
  color: black;
  margin: 0.7rem;
  margin-top: 1%;
  background: none;
  font-size: 1em;
  padding: 1em 6em;
  text-align: center;
  border: none;
  cursor: pointer;
`;

const ProfPic = styled.img`
  width: 12rem;
  height: 12rem;
  border: 2px solid black;
  border-radius: 50%;
  object-fit: cover;
  object-position: 100% 50;
  box-shadow: 1px 1px 5px 1px #777;
`;

const TextBox = styled.textarea`
font-family: courier;
color: yellow;
margin-top: 1%;
background: none;
outline: none;
resize: none;
border: 1px solid black; 
width: 30%;
height: 100px;
`

// import axios from "axios";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      aboutMe: "",
      imgPath: "",
      email: "",
    };
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { withCredentials: true })
      .then((response) => console.log(response));
  }

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is :", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("imgPath", e.target.files[0]);
    axios
      .post(process.env.REACT_APP_API_URL + "/users/file", uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          imgPath: response.data.imgPath,
        });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL +  "/users", this.state, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("added: ", res);

        this.props.me(() => {
          this.props.history.push("/profile");
        });
      })
      .catch((err) => {
        console.log("Error while adding the thing: ", err);
      });
  };

  componentDidMount = () => {
    this.setState(this.props.user);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <EditPage className="">
       
        <EditForm className="" onSubmit={(e) => this.handleSubmit(e)}>
            <ProfPic
              className="profileImg"
              src={this.state.imgPath ? this.state.imgPath : "nothing"}
              alt=""
            />
            <Input
              type="file"
              id="idProfileImg"
              name="imgPath"
              aria-describedby="image"
              placeholder={this.state.imgPath}
              onChange={(e) => this.handleFileUpload(e)}
            />
            <Label htmlFor="idName">Username</Label>
            <Input
              className="form-control"
              id="idName"
              aria-describedby="Name"
              placeholder={this.state.username}
              type="text"
              name="username"
              value={this.state.username || ""}
              onChange={(e) => this.handleChange(e)}
            />
            <Label>E-mail</Label>
            <Input
              className="form-control"
              id="idLastName"
              aria-describedby="Lastname"
              placeholder={this.state.email}
              type="email"
              name="email"
              value={this.state.email || ""}
              onChange={(e) => this.handleChange(e)}
            />
            <Label htmlFor="idSobreMi">About me</Label>
            <TextBox
              placeholder={this.state.aboutMe}
              type="text"
              name="aboutMe"
              value={this.state.aboutMe || ""}
              onChange={(e) => this.handleChange(e)}
            />
            <button className="btn" type="submit">
              save
            </button>
        </EditForm>
      </EditPage>
    );
  }
}
export default withAuth(EditProfile);
