import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const getUser = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { withCredentials: true })
      .then((response) => setUser(response.data));
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/scenes/${id}`, {
        withCredentials: true,
      })
      .then((response) => console.log(response));
    getUser();
  };

  return (
    <div className="ProfilePage">
      {!user ? (
        <Loader />
      ) : (
        <div>
          <div className="ProfileDiv">
            <img
              className="ProfPic" alt=""
              src={user.imgPath ? user.imgPath : "default"}
            />
            <h1 className="Title">{user.username}</h1>
            <h3 className="Mail">{user.email}</h3>
            <h4 className="Info">{user.aboutMe}</h4>
            <button>
              {" "}
              <Link to={`/edit-profile`}>
                <h4>Edit profile</h4>
              </Link>
            </button>
          </div>
          <div className="ScenesDiv">
            {user.scenes !== undefined
              ? user.scenes.map((scene) => {
                  return (
                    <div
                      className="ScenesCards"
                      
                      key={scene._id}
                    >
                      <img
                        className="SceneImg"
                        
                        src={scene.capture}
                        alt="asd"
                      />
                      <div>
                        <Link to={`/xp/${scene._id}`}>
                          <h2 className="nameScene">{scene.name}</h2>
                        </Link>
                        <button
                          className="buttonMalo"
                          onClick={() => {
                            handleDelete(scene._id);
                          }}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Profile);
