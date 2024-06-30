import Logo from "../icons/logo.png";
import Styles from "../styles/Header.module.css";
import Menu from "../icons/menu.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={Styles.header_container}>
      <div className={Styles.header_left_container}>
        <a className={Styles.header_logo_link} href="/">
          <img className={Styles.header_logo} src={Logo} alt="logo" />
        </a>
      </div>
      <div className={Styles.header_right_container}>
        <a className={Styles.header_nav_link} href="/connectors">
          Connectors
        </a>
        <a className={Styles.header_nav_link} href="/users">
          Users
        </a>
        <div className={Styles.header_menu} onClick={handleMenuClick}>
          <img src={Menu} className={Styles.header_menu_logo} alt="menu" />
        </div>
        <nav
          className={`${Styles.header_nav} ${
            isMenuOpen ? Styles.header_nav_open : ""
          }`}
        >
          <div onClick={handleLogout} className={Styles.header_nav_link}>
            Logout
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
