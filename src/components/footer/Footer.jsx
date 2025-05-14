// src/components/Footer/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer__copy"]}>
        © {new Date().getFullYear()} Raven. All rights reserved.
      </p>

      <div className={styles["footer__links"]}>
        <a href="#" className={styles["footer__contact"]}>
          Contact
        </a>

        <div className={styles["footer__socials"]}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer__icon"]}
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer__icon"]}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer__icon"]}
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer__icon"]}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
