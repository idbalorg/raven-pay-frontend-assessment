import md5 from "blueimp-md5";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function GravatarProfile() {
  const location = useLocation();
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
          const userWithEmail = { ...user, email }; // include email
          setGithubUser(userWithEmail);
          localStorage.setItem("user", JSON.stringify(userWithEmail));
          console.log("user details", userWithEmail);
        }
      });
  }, [email]);

  if (!email) {
    return (
      <p>
        No email provided. Please <Link to="/gravatar-auth">login</Link>.
      </p>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Profile for {email}</h2>
      {gravatarUrl && (
        <img src={gravatarUrl} width={100} height={100} alt="gravatar" />
      )}

      {githubUser && (
        <div style={{ marginTop: "1rem" }}>
          <h3>GitHub Match</h3>
          <img src={githubUser.avatar_url} width={80} alt="GitHub Avatar" />
          <p>{githubUser.login}</p>
          <a href={githubUser.html_url} target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}
