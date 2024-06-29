import styles from "../styles/Footer.module.css";
import Logo from "../icons/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <ul className={styles.footer_list}>
        <li className={styles.footer_item}>
          <a href="/about" className={styles.footer_link}>
            <img src={Logo} alt="logo" className={styles.footer_logo} />
          </a>
        </li>
        <li className={styles.footer_item}>
          <a href="/about" className={styles.footer_link}>
            About
          </a>
        </li>
        <li className={styles.footer_item}>
          <a href="/contact" className={styles.footer_link}>
            Contact
          </a>
        </li>
        <li className={styles.footer_item}>
          <a href="/privacy" className={styles.footer_link}>
            Privacy
          </a>
        </li>
        <li className={styles.footer_item}>
          <a href="/terms" className={styles.footer_link}>
            Terms
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
