import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Person, Block } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/some"); // Disabled route
    if (newValue === 2) navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Some" icon={<Block />} disabled />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </div>
  );
};

export default Navigation;
