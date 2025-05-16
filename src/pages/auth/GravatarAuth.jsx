import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GravatarAuth() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/gravatar-profile", { state: { email } });
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Enter Your Email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Continue
      </button>
    </div>
  );
}
