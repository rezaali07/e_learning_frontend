import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BottomTab from "../../more/BottomTab";
import MetaData from "../../more/MetaData";
import StoreIcon from "@material-ui/icons/Shop";
import SearchIcon from "@material-ui/icons/Search";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Creator from "@material-ui/icons/Store";
import ForumIcon from "@material-ui/icons/Forum";
// import Support from "@material-ui/icons/ReportProblem";
import QuestionMarkIcon from "@material-ui/icons/Cached";
import Update from "@material-ui/icons/DynamicFeedOutlined";
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
import TouchAppOutlinedIcon from "@material-ui/icons/TouchAppOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings"; // ✅ NEW
import { logout } from "../../actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoreOption = ({ history }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/login");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <MetaData title="More Option" />
      <div
        className="moreOption"
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          marginBottom: "10vh",
          display: "none", // adjust if you want this section visible
        }}
      >
        {isAuthenticated && (
          <Link to="/me">
            <div style={menuStyle}>
              <img
                src={user.avatar.url}
                alt={user.name}
                style={avatarStyle}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#000" }}>{user.name}</span>
                <span style={{ color: "#000", opacity: "0.6", fontSize: "14px" }}>
                  view your profile
                </span>
              </div>
            </div>
          </Link>
        )}

        <Link to="/products"><MenuItem icon={<StoreIcon />} text="Visit Shop" /></Link>
        <Link to="/search"><MenuItem icon={<SearchIcon />} text="Search Products" /></Link>
        <Link to="/cart"><MenuItem icon={<LocalMallIcon />} text="View Cart" /></Link>
        <Link to="/favourites"><MenuItem icon={<FavoriteBorderIcon />} text="View Favourite" /></Link>
        {isAuthenticated && <Link to="/orders"><MenuItem icon={<ListAltIcon />} text="My Orders" /></Link>}
        <Link to="/commingsoon"><MenuItem icon={<Creator />} text="Create Own Shop" /></Link>
        <Link to="/commingsoon"><MenuItem icon={<ForumIcon />} text="Live chat support" /></Link>
        {isAuthenticated && <Link to="/me/update"><MenuItem icon={<VpnKeyIcon />} text="Change Password" /></Link>}
        {isAuthenticated && <Link to="/me/update"><MenuItem icon={<QuestionMarkIcon />} text="Forgot Password" /></Link>}
        {isAuthenticated && <Link to="/me/update/profile"><MenuItem icon={<Update />} text="Update Profile" /></Link>}
        <Link to="/contact"><MenuItem icon={<ContactMailOutlinedIcon />} text="Contact Us" /></Link>
        <Link to="/faq"><MenuItem icon={<TouchAppOutlinedIcon />} text="User Guide" /></Link>
        {/* <Link to="/support"><MenuItem icon={<Support />} text="Report us" /></Link> */}

        {/* ✅ New Settings Link */}
        {isAuthenticated && (
          <Link to="/settings">
            <MenuItem icon={<SettingsIcon />} text="Account Settings" />
          </Link>
        )}

        {/* Logout */}
        {isAuthenticated && (
          <div style={menuItemStyle} onClick={logoutUser}>
            <ExitToAppIcon style={iconStyle} />
            <span style={{ color: "#000" }}>Log Out</span>
          </div>
        )}
      </div>

      <BottomTab />
      <ToastContainer position="bottom-center" autoClose={5000} />
    </>
  );
};

// ✅ Reusable Menu Item Component
const MenuItem = ({ icon, text }) => (
  <div style={menuItemStyle}>
    {React.cloneElement(icon, { style: iconStyle })}
    <span style={{ color: "#000" }}>{text}</span>
  </div>
);

// ✅ Styles
const menuStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid rgb(0 0 0 / 25%)",
  padding: "4px 0",
  width: "100%",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "100%",
  objectFit: "cover",
  marginRight: "10px",
};

const iconStyle = {
  fontSize: "30px",
  color: "#000",
  marginRight: "10px",
};

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "7px 0",
};

export default MoreOption;
