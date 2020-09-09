import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import styled from "styled-components";
import { Device } from "../components/Device";


class Private extends Component {
  render() {
    const AboutInstr = styled.div`
      @media ${Device.laptop} {
        position: relative;
        margin: 0 auto;
      }
      @media ${Device.tablet} {
        width: 100%;
        background-color: blue;
      }
      @media ${Device.mobile} {
        width: 100%;
        background-color: yellow;
      }

      img {
        max-width: 50%;
      }

    `;
    return (
      <AboutInstr>
     
     <h1>MAIN PAGE</h1>
      </AboutInstr>
    );
  }
}

export default withAuth(Private);