import React, { useState, useEffect } from "react";
import Modal from "./ReusableModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../../actions/UserActions";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
import { toast } from "react-toastify";

const ChangeEmailModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Email updated successfully");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
      onClose(); // Close the modal after success
    }
  }, [dispatch, error, isUpdated, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Email">
      <form onSubmit={handleSubmit} className="custom-modal-form">
        <label>New Email Address:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update Email</button>
      </form>
    </Modal>
  );
};

export default ChangeEmailModal;
