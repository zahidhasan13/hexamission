import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
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
      navigate("/");
    }
  };

  return { error, loading, signup };
};

export default useSignup;
