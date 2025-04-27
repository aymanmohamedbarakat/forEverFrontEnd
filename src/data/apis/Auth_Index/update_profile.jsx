import axios from "axios";
import { domain } from "../../../store";
import { toast } from "react-toastify";

export const updateUserProfile = async (userId, values, currentUser, token) => {
  if (
    values.name === currentUser.username &&
    values.email === currentUser.email &&
    values.phone === currentUser.phone
  ) {
    toast.info("No changes detected in your profile" , {
        position: "top-right",
        autoClose: 1200,
    });
    return null;
  }

  try {
    const response = await axios.put(
      `${domain}/api/users/${userId}`,
      {
        username: values.name, // Map name to username field as needed
        email: values.email,
        phone: values.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 1200,
      });
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Profile update error:", error);
    toast.error(
      error.response?.data?.error?.message || "Failed to update profile"
    );
    return null;
  }
};
