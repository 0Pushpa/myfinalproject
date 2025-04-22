import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const history = useNavigate();
  React.useEffect(() => {
    history("/slate/groups");
  }, []);
  return null;
};

export default Redirect;
