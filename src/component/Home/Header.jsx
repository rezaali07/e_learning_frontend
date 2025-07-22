import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import live_logo_gif from "../../Assets/wallpaper/live_logo.gif";

const Header = () => {
  const switcherTab = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [showNoticesDropdown, setShowNoticesDropdown] = useState(false);
  const history = useHistory();

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "default";
  });

  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);

  // Fetch favorite count for badge
  const fetchFavouriteCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setFavouriteCount(0);
        return;
      }
      const response = await axios.get("/api/v2/courses/favorited", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavouriteCount(response.data.courses?.length || 0);
    } catch (error) {
      console.error("Error fetching favourite courses:", error);
      setFavouriteCount(0);
    }
  };

  // Fetch recent notifications (max 5)
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotifications([]);
        return;
      }
      const res = await axios.get("/api/v2/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications.slice(0, 5));
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchFavouriteCount();
    fetchNotifications();
  }, []);

  // Listen for favoriteUpdated event to update badge dynamically
  useEffect(() => {
    const handleFavoriteUpdate = () => {
      fetchFavouriteCount();
    };
    window.addEventListener("favoriteUpdated", handleFavoriteUpdate);
    return () => window.removeEventListener("favoriteUpdated", handleFavoriteUpdate);
  }, []);

  // Apply theme mode classes to body and save to localStorage
  useEffect(() => {
    document.body.classList.remove("visual-aid", "dark-mode");
    if (mode === "visual-aid") document.body.classList.add("visual-aid");
    else if (mode === "dark") document.body.classList.add("dark-mode");
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Initialize theme mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("themeMode") || "default";
    setMode(saved);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) navbar.classList.add("active");
      else navbar.classList.remove("active");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleThemeOptions = () => {
    setShowThemeOptions(!showThemeOptions);
  };

  const navigateToNotifications = () => {
    setShowNoticesDropdown(false);
    history.push("/notifications");
  };

  return (
    <div className="Header">
      <div className="navbar" ref={switcherTab}>
        <div className="navigation">
          <Link to="/">
            <img src={live_logo_gif} alt="E-Learning Logo" className="logo" />
          </Link>
          <ul>
            <li>
              <NavLink id="nav-dashboard-link" exact to="/" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink id="nav-courses-btn" to="/courses" activeClassName="active">
                Courses
              </NavLink>
            </li>
            <li
              className="notices-dropdown"
              onMouseEnter={() => setShowNoticesDropdown(true)}
              onMouseLeave={() => setShowNoticesDropdown(false)}
            >
              <span
                id="nav-notifications-btn"
                className="notices-link"
                onClick={navigateToNotifications}
                style={{ cursor: "pointer" }}
              >
                Notifications ▼
              </span>
              {showNoticesDropdown && (
                <div className="dropdown-menu">
                  {notifications.length === 0 ? (
                    <div className="dropdown-item">No notifications</div>
                  ) : (
                    <>
                      {notifications.map((notif) => (
                        <div key={notif._id} className="dropdown-item">
                          <strong>{notif.sender?.name || "Admin"}:</strong>{" "}
                          {notif.message.length > 40
                            ? notif.message.slice(0, 40) + "..."
                            : notif.message}
                          <br />
                          <small>{new Date(notif.createdAt).toLocaleString()}</small>
                        </div>
                      ))}
                      <div
                        className="dropdown-item see-more"
                        onClick={navigateToNotifications}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        See More...
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
            {/* <li>
              <NavLink id="nav-favorites-btn" to="/favorites" activeClassName="active">
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink id="nav-colleges-btn" to="/colleges" activeClassName="active">
                Colleges
              </NavLink>
            </li>
            <li>
              <NavLink id="nav-routines-btn" to="/exam-routines" activeClassName="active">
                Routines
              </NavLink>
            </li> */}
          </ul>
        </div>

        <div className="rightOption">
          <div
            id="nav-theme-btn"
            className="icon-link theme-toggle-button"
            onClick={toggleThemeOptions}
            title="Toggle Theme Mode"
            style={{ cursor: "pointer" }}
          >
            {mode === "dark" ? "🌙" : mode === "visual-aid" ? "👁️" : "☀️"}
          </div>
          {showThemeOptions && (
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="theme-select"
            >
              <option value="default">Default</option>
              <option value="visual-aid">Visual Aid</option>
              <option value="dark">Dark Mode</option>
            </select>
          )}

          <Link
            id="nav-search-btn"
            to="/search"
            className="icon-link"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Link>

          <Link
            id="nav-favorites-icon-btn"
            to="/favorites"
            className="icon-link relative"
            title="Favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
            {favouriteCount > 0 && <div className="badge">{favouriteCount}</div>}
          </Link>

          <Link
            id="nav-user-btn"
            to="/login"
            className="icon-link user-icon"
            title="User Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

