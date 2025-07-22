import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div>
            <MetaData title={`${user?.name}'s profile`} />
            <div className="profileContainer">
              <div className="profileDetails">
                <h1>My Profile</h1>
                <img
                  src={user?.avatar?.url || ""}
                  alt="avatar"
                  className="profile__img"
                />
                <Link to="/me/update/profile" className="edit__profile">Edit Profile</Link>
              </div>
            </div>

            <div className="information">
              <div className="middle">
                <div className="info"><h4>Full Name:</h4><p>{user?.name || "N/A"}</p></div>
                <div className="info"><h4>Email:</h4><p>{user?.email || "N/A"}</p></div>
                <div className="info">
                  <h4>Joined On:</h4>
                  <p>{user?.createdAt ? user.createdAt.substr(0, 10) : "N/A"}</p>
                </div>

                <div className="change__info">
                  <Link to="/me/liked" className="settings">❤️ Liked Courses</Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Profile;
