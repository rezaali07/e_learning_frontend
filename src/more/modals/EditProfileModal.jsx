import React, { useState } from "react";
import Modal from "./ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/UserActions";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user.avatar?.url || "/profile.png");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("name", name);
    form.set("avatar", avatar);
    dispatch(updateProfile(form));
    toast.success("Profile updated successfully");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        <img src={preview} alt="Preview" height="80" style={{ marginTop: 10 }} />

        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
