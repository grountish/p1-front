import React from "react";
import styled from "styled-components";
import { Device } from "../components/Device";
import { Link } from "react-router-dom";

function Home() {
  const HomeCointainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-items: center;
    text-align: center;
    color: black;
    width:100%;
    letter-spacing: 15px;
    
    a{
      text-decoration: none;
      font-weight: 500;
    }
  `;

  const HomeBtn = styled.button`
  color: black;
  border: 2px solid black;
  display: flex;
  font-family: courier;
  margin-top: 30%;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  transition: 0.5s;
  :hover{
    color:white;
    background-color: rgba(255, 255, 255, 0.3);
    border: none
  }
  `

  const Title = styled.h1`
    @media ${Device.laptop} {
      max-width: 1100px;
      font-size: 10rem;
      font-family: Mantra;
      margin-top: 15%;
    }
    @media ${Device.tablet} {
      max-width: 768px;
      font-size: 6rem;
    }
    @media ${Device.mobile} {
      max-width: 400px;
      font-size: 3rem;
    }
  `;
  return (
    <HomeCointainer>
      <Title>bienvenido</Title>
      <Link to={"/private"} id="xp-btn">
             <HomeBtn>enter</HomeBtn> 
            </Link>
    </HomeCointainer>
  );
}

export default Home;