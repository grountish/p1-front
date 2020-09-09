import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";



class Navigation extends Component {
  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;

    return (
      <div className="navigation">
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
            <h4 onClick={logout}>logout</h4>
          </div>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <h4 className="navbar-button">login</h4>{" "}
            </Link>
            <br />
            <Link to="/signup">
              {" "}
              <h4 className="navbar-button">signup</h4>{" "}
            </Link>
          </>
        )}
      </div>
    );
  }
}
export default withAuth(Navigation);