import React, { Component } from "react";
import { withAuth } from './../lib/Auth';


class Private extends Component {
  render() {

    return (
      <div>
     
     <h1>MAIN PAGE</h1>
      </div>
    );
  }
}

export default withAuth(Private);