import { API, handleApiError } from "./utils";

export const signIn = async (formData) => {
  try {
    const res = await API.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signUp = async (formData) => {
  try {
    const res = await API.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return {
      error: error.response.data.errors,
      data: null,
    };
  }
};

export const logout = async () => {
  try {
    const res = await API.post("/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};