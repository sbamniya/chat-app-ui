import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.logoutButton}>
      <Button danger type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
