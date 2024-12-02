import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/root");
  }, [navigate]);

  return null;
};

export { Homepage };
