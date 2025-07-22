// eslint-disable-next-line
import React from "react";
import "./BottomTab.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";

const BottomTab = () => {
  // safe access: if state.favourite undefined, fallback to empty array
  const favouriteItems = useSelector((state) => state.favourite?.favouriteItems || []);

  return (
    <>
      <div className="bottomOption">
        <Link to="/">
          <HomeIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
              opacity: ".8",
            }}
          />
        </Link>
        <Link to="/search">
          <SearchIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
            }}
          />
        </Link>
        <Link to="/me">
          <PersonIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
              opacity: ".8",
            }}
          />
        </Link>
      </div>
    </>
  );
};

export default BottomTab;
