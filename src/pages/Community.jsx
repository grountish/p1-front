  
import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/Auth";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Loader from '../components/Loader'

class Community extends Component {
  // static contextType = SongsContext;
  state = {
    scenes: [],
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/scenes", { withCredentials: true })
      .then((response) => this.setState({ scenes: response.data }));
      console.log(this.state.scenes);
  }

  render() {
  
    const ScenesDiv = styled.div`
    width: 100%;
    float: right;
    height:100%;
    display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 2px;
          grid-auto-rows: min-max(15rem);
          justify-items: center;
          align-items: center;
          border-radius:10%
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

    const SceneImg = styled.img`
    width:20rem;
    height: 20rem;
    object-fit: cover;
    transition: 0.5s;
    opacity:1;
    :hover {
      opacity: 0.1;
    }
    
    `
    
    const SceneText = styled.div`
    width:20rem;
    height: 20rem;
    background: rgba(200, 200, 200, 0.72);
    color: #fff;
    position: absolute;
    font-family: courier;
    display:flex;
    flex-direction: row;
    transition: 0.5s;
    opacity:0;
    
            :hover{
              opacity:1;
            }
      
    a{
      text-decoration: none;
      color: black;
      font-size: 1rem;
    }
    `
    // const CardA = styled.a`
    // height: 1rem;
    // width: 1rem;
    // background-color: #a71b1b;
    // border: 2px solid black;
    // border-radius: 10%;
    // text-align: center;
    // padding:17px;
    // justify-content: center;
    // margin: 10px;
    // cursor: pointer;
    // opacity: 0.75;
    // `
    
    const Title = styled.h1`
          font-family: Mantra;
          font-size: 3rem;
          color: white;
          margin: 60px auto;
          text-align: center;
          
        `;
    return (
      <div>
     
        <Title>Community Page </Title>
        <ScenesDiv>
              { this.state.scenes !== undefined 
              ? this.state.scenes.map(scene=>{
                  return(
                     <ScenesCards className="sceneCard" key={scene._id}>
                  
                      <SceneImg className="imgCard" src={scene.capture} alt="asd"/> 
                      <SceneText>
                     
                     <Link to={`/xp/${scene._id}`}> 
                      <h2 className="nameScene">{scene.name}</h2>
                      <h2 className="userScene">{scene.user.username}</h2>
                     </Link> 
                     
                      </SceneText>
                    </ScenesCards> 
                  )
                })
                : null
              }
            </ScenesDiv>
      </div>
    );
  }
}

export default withAuth(Community);