
import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from '../components/Loader'


const ProfilePage = styled.div`
      align-items: center;
      color: black;

      .buttonMalo {
        padding: 2px;
        padding-top: 0;
      }
`
const ScenesDiv = styled.div`
margin-top: 7%;
width: 60%;
float: right;
height:100%;
display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2px;
      grid-auto-rows: min-max(15rem);
      justify-content: center;
      align-items: center;
`
const ProfileDiv = styled.div`
      margin-top: 7%;
      margin-bottom: 200px;
      display: flex;
      position: fixed;
      flex-direction: column;
      align-items: center;
      width: 34%;
      float: left;
      height:100%;
      border-right: 1px solid #AAA;
`
const ScenesCards = styled.div`
cursor: pointer;
display: flex;
        flex-direction: column;
        max-width: 20rem;
        height: 20rem;
        align-items: center;
        justify-items: center;
        margin: 1rem;
        position: relative;
        
`
const ProfPic = styled.img`
width:13rem;
height: 13rem;
border: solid 2px black;
border-radius: 50%;
object-fit: cover;
object-position: 100% 50;
box-shadow: 1px 1px 5px 1px #777;
`
const SceneImg = styled.img`
width:20rem;
height: 20rem;
object-fit: cover;
`

const SceneText = styled.div`
width:20rem;
height: 20rem;
justify-content: center;
background: rgba(200, 200, 200, 0.72);
color: #fff;
position: absolute;
transition: 0.5s;
opacity:0;
        :hover{
          opacity:1;
        }
a{
  text-decoration: none;
  color: white;
  font-size: 1rem;
}
`

const Title = styled.h1`
      font-family: Mantra;
      font-size: 2rem;
      color: white;
      margin-top: 1.5rem;
    `;
    const Mail = styled.h3`
    font-family: courier;
    font-size: 1.2rem;
    color: white;
    margin-top: 2rem;
  `;
    const Info = styled.h3`
    font-family: courier;
    font-size: 0.8rem;
    text-align: center;
    color: white;
    margin: 1.6rem;
  `;
class Profile extends Component {
    state = {
        user: null,
    };


  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { withCredentials: true })
      .then((response) => this.setState({ user: response.data }));
  }

  handleDelete(id){
    console.log(id)
    axios
    .delete(`${process.env.REACT_APP_API_URL}/scenes/${id}`, { withCredentials: true })
    .then((response) => console.log(response));
    this.componentDidMount()

  }

  render() {
    const { user } = this.state;
    return (
      <ProfilePage>
     
        {!user ? (
          <Loader />
        ) : (
          <div>
          <ProfileDiv >
             <ProfPic 
              src={user.imgPath ? user.imgPath : 'default'}
              alt="Scene Capture "
            />
            <Title>{user.username}</Title>
            <Mail>{user.email}</Mail>
            <Info>{user.aboutMe}</Info>
           <button> <Link style={{color:'white', textDecoration:'none'}} to={`/edit-profile`}>
                  <h4>Edit profile</h4>
            </Link></button>
        </ProfileDiv>
            <ScenesDiv>
              { user.scenes !== undefined 
              ? user.scenes.map(scene=>{
                  return(
                     <ScenesCards className="sceneCard" key={scene._id}>
                  
                      <SceneImg className="imgCard" src={scene.capture} alt="asd"/> 
                      <SceneText>
                     <Link to={`/xp/${scene._id}`}> 
                      <h2 className="nameScene">{scene.name}</h2>
                     </Link> 
                      <button className="buttonMalo" onClick={()=>{this.handleDelete(scene._id)}}>x</button>
                      </SceneText>
                    </ScenesCards> 
                  )
                })
                : null
              }
            </ScenesDiv>
            </div>
        )}
      </ProfilePage>
    );
  }
}

export default withAuth(Profile);