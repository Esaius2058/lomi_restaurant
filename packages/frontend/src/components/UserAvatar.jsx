"use client";
import { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";

export function UserAvatar({ name, email, avatarUrl = "", setNotification }) {
  const [open, setOpen] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const api = import.meta.env.VITE_BACKEND_API_URL;
    const logout = () => {}
  const handleLogout = async () => {
    try {
      const res = await fetch(`${api}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      logout();

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show a notification)
      setNotification({
        message: "Logout failed",
        description: error.message,
        type: "error",
      });
    } finally {
      // redirect the user to login
      window.location.href = "/auth/login";
    }
  };

  const passwordRef = useRef(null);
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const form = passwordRef.current;
    if (!form) return;

    try {
      const formData = new FormData(form);
      const oldPassword = formData.get("oldpassword");
      const newPassword = formData.get("newpassword");
      const confirmNewPassword = formData.get("confirmpassword");

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      const update = await updatePassword(oldPassword, newPassword);

      if (!update) {
        throw new Error("No response from server");
      } else {
        setNotification({
          message: update.message || "Password updated successfully!",
          type: "success",
        });
      }

      if (update.error) {
        throw new Error(update.error);
      }

      setPasswordToggle(false);
      form.reset();
    } catch (error) {
      console.error("Error changing password: ", error);
      setNotification({
        message: "Error changing password.",
        type: "error",
        description: error.message,
      });
    }
  };

  const handleDeleteProfile = async () => {
    const flag = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!flag) {
      return;
    }

    try {
      const deleteResponse = await deleteUserProfile();

      if (!deleteResponse) {
        throw new Error(deleteResponse.message || "Failed to delete account");
      } else {
        window.location.href = "/auth/login";
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
            <UserCircle size={35}/>
          </div>
        )}
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="profile-info">
            <span className="profile-name">{name || "John Doe"}</span>
            <span className="profile-email">
              {email || "john345@gmail.com"}
            </span>
          </div>
          <hr className="divider" />
          {passwordToggle == false ? (
            <div className="settings-options">
              <button
                onClick={() => setPasswordToggle(true)}
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <button onClick={handleDeleteProfile}>
                Delete Account
              </button>
            </div>
          ) : (
            <div className="password-change">
              <form onSubmit={handlePasswordChange} ref={passwordRef}>
                <input
                  type="text"
                  name="oldpassword"
                  id="old-password"
                  placeholder="old password"
                  required
                />
                <input
                  type="text"
                  name="newpassword"
                  id="new-password"
                  placeholder="new password"
                  required
                />
                <input
                  type="text"
                  name="confirmpassword"
                  id="confirm-password"
                  placeholder="confirm new password"
                  required
                />
                <div className="button-div">
                  <button className="primary-btn" type="submit">
                    Change Password
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => setPasswordToggle(false)}
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
