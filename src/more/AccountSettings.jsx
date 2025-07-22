import React, { useState } from "react";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import BottomTab from "../more/BottomTab";
import EditProfileModal from "../more/modals/EditProfileModal";
import ChangePasswordModal from "../more/modals/ChangePasswordModal";
import ChangeEmailModal from "../more/modals/ChangeEmailModal";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const settingsData = [
    {
      title: "Password",
      desc: "Change your password",
      button: "Change Password",
      icon: "\ud83d\udd10",
      action: () => setShowChangePassword(true),
    },
    {
      title: "Profile Edit",
      desc: "Edit your profile picture, name",
      button: "Edit Avatar",
      icon: "\u270d\ufe0f",
      action: () => setShowEditProfile(true),
    },
    {
      title: "Emails",
      desc: "Change your email address",
      button: "Update Email Address",
      icon: "\ud83d\udce7",
      action: () => setShowChangeEmail(true),
    },
    {
      title: "favorites Courses",
      desc: "View your liked courses",
      button: "View Favorites",
      icon: "\u2764\ufe0f",
      action: () => (window.location.href = "/favorites"),
    },
    {
      title: "Courses You Liked",
      desc: "You have 0 Liked Courses",
      icon: "\ud83d\udcdd",
      button: "See More",
      action: () => (window.location.href = "/me/liked"),
    },
    {
      title: "Course Completed",
      desc: "Courses you've finished",
      button: "View Completed",
      icon: "\ud83d\udcc4",
      action: () => (window.location.href = "/me/course-progress"),
    },
    {
      title: "Course in Progress",
      desc: "Continue your learning",
      button: "Resume Learning",
      icon: "\u23f3",
      action: () => (window.location.href = "/me/course-progress"),
    },
    {
      title: "Gamification",
      desc: "Currently enabled",
      button: "Learn More",
      icon: "\ud83c\udfae",
      action: () => alert("Gamification features coming soon"),
    },
    {
      title: "Quiz Progress",
      desc: "Track your quiz performance over time",
      button: "View Progress",
      icon: "📊",
      action: () => (window.location.href = "/me/quiz-progress"),
    },
    {
      title: "Course Progress",
      desc: "Track your Course performance over time",
      button: "View Progress",
      icon: "📊",
      action: () => (window.location.href = "/me/course-progress"),
    },
    {
      title: "My Purchase",
      icon: "\ud83d\uded2",
      button: "View",
      action: () => (window.location.href = "/me/purchased"),
    },
  ];

  return (
    <>
      <Header />
      <div className="account-settings">
        <h2>Account Settings</h2>
        <div className="settings-grid">
          {settingsData.map((item, index) => (
            <div className="settings-card" key={index}>
              <div className="icon-box">{item.icon}</div>
              <div className="content-box">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {item.button && (
                  <button onClick={item.action}>{item.button}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
      />

      <Footer />
      <BottomTab />
    </>
  );
};

export default AccountSettings;
