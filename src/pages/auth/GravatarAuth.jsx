import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GravatarAuth.module.scss";

export default function GravatarAuth() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim()) {
      navigate("/gravatar-profile", { state: { email } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["auth"]}>
        <div className={styles["auth__container"]}>
          <h2 className={styles["auth__title"]}>Enter Your Email</h2>
          <input
            className={styles["auth__input"]}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <button className={styles["auth__button"]} onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
