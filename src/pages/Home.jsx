import React from "react";

import { Link } from "react-router-dom";

const Home =()=> {
  
  return (
    <div>
      <h1>bienvenido</h1>
      <Link to={"/private"} id="xp-btn">
             <button>enter</button> 
            </Link>
    </div>
  );
}

export default Home;