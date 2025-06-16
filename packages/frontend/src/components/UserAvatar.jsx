"use client";
import { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { updateUserApi, deleteUserProfile, logout } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export function UserAvatar({ avatarUrl = "" }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [updateUserToggle, setUpdateUserToggle] = useState(false);
  const [notification, setNotification] = useState(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    //clean up when the component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      window.location.href = "/auth/login";
    } catch (error) {
      console.log("Error logging out: ", error);
      setNotification({
        message: "Logout failed",
        description: result.message,
        type: "error",
      });
    }
  };

  const profileRef = useRef(null);
  /*useEffect(() => {
    if (profileRef.current) {
      console.log("Form element:", profileRef.current); // Verify ref binding
      profileRef.current.addEventListener("submit", handleUserProfileChange);
      return () => profileRef.current?.removeEventListener("submit", handleUserProfileChange);
    }
  }, []);*/
  const handleUserProfileChange = async (e) => {
    e.preventDefault();
    console.log("submit triggered");

    const form = profileRef.current;
    if (!form) return;

    try {
      const formData = new FormData(form);
      const name = formData.get("name") || user.name;
      const email = formData.get("email") || user.email;
      const oldPassword = formData.get("oldpassword");
      const newPassword = formData.get("newpassword");
      const confirmNewPassword = formData.get("confirmpassword");

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      const updateData = {
        name: name,
        email: email,
        oldpassword: oldPassword,
        newpassword: newPassword,
      };

      const update = await updateUserApi(updateData);

      if (update.success) {
        setNotification({
          message: "User profile updated successfully!",
          description: update.message,
          type: "success",
        });
        //throw new Error("No response from server");
      } else {
        setNotification({
          message: "Something went wrong! :(",
          description: update.message,
          type: "error",
        });
      }

      setUpdateUserToggle(false);
      form.reset();
    } catch (error) {
      console.error("Error updating user profile: ", error);
      setNotification({
        message: "Error updating your profile.",
        type: "error",
        description: error.message,
      });
    }
  };

  const delref = useRef(null);
  const handleDeleteProfile = async () => {
    const flag = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!flag) {
      return;
    }
    const password = prompt("Please enter your password to confirm:");
    if (!password) return;

    const form = delref.current;

    if (!form) return;

    try {
      const formData = new FormData(form);
      const password = formData.get("password");

      const deleteResponse = await deleteUserProfile(password);

      if (deleteResponse.success) {
        //throw new Error(deleteResponse.message || "Failed to delete account");
        setNotification({
          message: "User profile deleted successfully!",
          description: deleteResponse.message,
          type: "success",
        });
        window.location.href = "/auth/login";
      } else {
        console.error("Error deleting account:", error);
        setNotification({
          message: "Failed to delete account. Try again.",
          description: deleteResponse.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setNotification({
        message: "Failed to delete account. Try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="user-avatar-container" ref={menuRef}>
      <button className="avatar-button" onClick={() => setOpen(!open)}>
        {avatarUrl !== "" ? (
          <img src={avatarUrl} alt="user-avatar" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">
            <UserCircle size={35} />
          </div>
        )}
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="profile-info">
            <span className="profile-name">{user.name || "Guest"}</span>
            <span className="profile-email">{user.email || "No email"}</span>
          </div>
          <hr className="divider" />
          {updateUserToggle == false ? (
            <div className="settings-options">
              <button type="button" onClick={() => setUpdateUserToggle(true)}>
                Update profile
              </button>
              <button type="button" onClick={handleLogout}>
                Log Out
              </button>
              <button onClick={handleDeleteProfile}>Delete Account</button>
            </div>
          ) : (
            <div className="password-change">
              <form onSubmit={handleUserProfileChange} ref={profileRef}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  defaultValue={user.name}
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  defaultValue={user.email}
                />
                <input
                  type="password"
                  name="oldpassword"
                  id="old-password"
                  placeholder="old password"
                  required
                />
                <input
                  type="password"
                  name="newpassword"
                  id="new-password"
                  placeholder="new password"
                  required
                />
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirm-password"
                  placeholder="confirm new password"
                  required
                />
                <div className="button-div">
                  <button type="submit" className="primary-btn">
                    Update profile
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => setUpdateUserToggle(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
