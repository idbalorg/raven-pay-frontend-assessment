import md5 from "blueimp-md5";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./GravatarProfile.module.scss";

export default function GravatarProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [gravatarUrl, setGravatarUrl] = useState(null);
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    if (!email) return;

    const hash = md5(email.trim().toLowerCase());
    setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);

    fetch(`https://api.github.com/search/users?q=${email}`)
      .then((res) => res.json())
      .then((data) => {
        const user = data.items?.[0];
        if (user) {
          const userWithEmail = { ...user, email };
          setGithubUser(userWithEmail);
          localStorage.setItem("user", JSON.stringify(userWithEmail));
        }
      });
  }, [email]);

  const handleEnterApp = () => navigate("/app");

  if (!email) {
    return (
      <p>
        No email provided. Please <Link to="/gravatar-auth">login</Link>.
      </p>
    );
  }

  return (
    <div className={styles.profile}>
      <h2 className={styles["profile__title"]}>Welcome, {email}</h2>
      {gravatarUrl && (
        <img
          src={gravatarUrl}
          width={100}
          height={100}
          alt="Gravatar"
          className={styles["profile__avatar"]}
        />
      )}

      {githubUser && (
        <div className={styles["profile__github"]}>
          <h3>GitHub Match</h3>
          <img
            src={githubUser.avatar_url}
            width={80}
            alt="GitHub Avatar"
            className={styles["profile__github-avatar"]}
          />
          <p>{githubUser.login}</p>
          <a
            href={githubUser.html_url}
            target="_blank"
            rel="noreferrer"
            className={styles["profile__link"]}
          >
            View GitHub
          </a>
        </div>
      )}

      <button onClick={handleEnterApp} className={styles["profile__enter"]}>
        Enter App
      </button>

      <div className={styles["profile__back"]}>
        <Link to="/gravatar-auth">Back to Login</Link>
      </div>
    </div>
  );
}
