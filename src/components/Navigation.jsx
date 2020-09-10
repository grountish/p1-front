import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";
import useWindowSize from '../lib/useWindowsSize'

const Navigation = ({ user, logout, isLoggedIn })=> {
 
  const [isActive, setIsActive] = useState(false)
  const size = useWindowSize();

  // useEffect(() => {
  
  //   if (size.width > 500) setIsActive(true)
  // }, [size.width])
 
    return (
     
      <div>
        {
          size.width > 500 || isActive
          ? <div className="navigation" >
        <Link to={"/private"} id="xp-btn">
          <h4 className="logo">p1</h4>
        </Link>

        {isLoggedIn ? (
          <div className="navbar-btns">
            <Link to={"/profile"} id="profile-btn">
              <h4>{user.username}</h4>
            </Link>
           
            {
              user.role 
              ? <Link to={"/admin"} id="xp-btn">
              <h4>administ  </h4>
            </Link>
            : null
            }
           
            <Link to={"/private"} id="xp-btn">
              <h4>main </h4>
            </Link>
            <Link to={"/community"} id="comunity-btn">
              <h4>community</h4>
            </Link>
            <h4 className="comunity-btn" onClick={logout}>logout</h4>
            {
              isActive
              ?<h1 onClick={()=>setIsActive(!isActive)}>X</h1>
              :null
            }
          </div>
        ) : (
          <div className="log-sign">
            <Link to="/login">
              {" "}
              <h4 className="navbar-button">login</h4>{" "}
            </Link>
            <br />
            <Link to="/signup">
              {" "}
              <h4 className="navbar-button">signup</h4>{" "}
            </Link>
            {
              isActive
              ?<h1 onClick={()=>setIsActive(!isActive)}>X</h1>
              :null
            }
            
          </div>
        )}
      </div>
      : <h1 onClick={()=>setIsActive(!isActive)}>X</h1>
        }
      </div>
      
    );
  }

export default withAuth(Navigation);