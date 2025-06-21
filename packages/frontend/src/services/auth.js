const api = "http://localhost:3000/api";

export async function SignupApi(signUpData) {
  const response = await fetch(`${api}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });

  const data = await response.json();

  if (response.ok) {
    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("token_expiry", Date.now() + 3600 * 4000);
    return { success: true, message: data.message, user: data.user };
  } else {
    return { success: false, message: data.message || "Registration failed!!" };
  }
}

export async function LoginApi(loginData) {
  const response = await fetch(`${api}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (response.ok) {
    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("token_expiry", Date.now() + 3600 * 4000);
    return { success: true, message: data.message, user: data.user };
  } else {
    return { success: false, message: data.message || "Registration failed!!" };
  }
}

export async function updateUserApi(updateData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "No token found. Are you logged in?",
      };
    }

    const response = await fetch(`${api}/user/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updateData }),
    });

    const data = await response.json();

    if (response.ok) {
      // Update token if changed (e.g., after email update)
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token_expiry", Date.now() + 14400000);
      }
      
      return {
        success: true,
        user: data.user,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message:
          data.message || "Update failed. Your changes were eaten by a grue.",
      };
    }
  } catch (error) {
    console.error("Update meteor crashed:", error);
    return {
      success: false,
      message: "Failed to update. Are you offline?",
    };
  }
}

export async function deleteUserProfile(password) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "No token found. Are you logged in?",
      };
    }

    const response = await fetch(`${api}/user/me`, {
      // 🔥
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }), // Require password for deletion
    });

    const data = await response.json();

    if (response.ok) {
      // Obliterate all user traces
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");
      return {
        success: true,
        message: data.message || "Account deleted. We’ll miss you... not.",
      };
    } else {
      return {
        success: false,
        message:
          data.message || "Deletion failed. Account survives another day.",
      };
    }
  } catch (error) {
    console.error("Delete apocalypse failed:", error);
    return {
      success: false,
      message: "Server resisted your deletion attempt. Try again later.",
    };
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Already logged out?"); // Passive-aggressive logging
      return {
        success: true,
      };
    }

    const response = await fetch(`${api}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: "Failed to log out user!!" };
    }

    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");

    return {
      success: true,
      message: "Logged out. Go touch grass. Now that you've eaten.",
    };
  } catch (error) {
    console.error("Logout failed spectacularly:", error);
    // Still clear local storage even if backend fails
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    return {
      success: false,
      message: "Logged out locally, but the server might still love you.",
    };
  }
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "You are not logged in!!!" };
    }
    const response = await fetch(`${api}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Clear invalid token
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Session expired. Please log in again.",
      };
    }

    const data = await response.json();

    return {
      success: true,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
    };
  } catch (error) {
    console.error("Fetch user failed:", error);
    return {
      success: false,
      message: "Network error. Check your connection.",
    };
  }
}

export async function fetchMenuItems(token) {
  try {
    const response = await fetch(`${api}/menu-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    return await response.json();
  } catch (error) {
    console.error("Menu fetch error:", error);
    throw error; // Re-throw for handling in components
  }
}
