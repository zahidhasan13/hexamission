import React, { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:8400/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    }
    if (res.ok) {
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
    }
  };

  return { error, loading, login };
};

export default useLogin;
