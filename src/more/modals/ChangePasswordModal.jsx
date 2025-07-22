import React, { useState } from "react";
import Modal from "./ReusableModal";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../actions/UserActions";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
    toast.success("Password updated successfully");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit}>
        <label>Current Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
